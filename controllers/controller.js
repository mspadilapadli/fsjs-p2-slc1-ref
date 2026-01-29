const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Grocery, User } = require("../models");
// const errorHandler = require("../middlewares/errorHandler");
class Controller {
    static async register(req, res, next) {
        try {
            console.log(req.body);
            let user = await User.create(req.body);
            let notif = {
                id: user.id,
                email: user.email,
            };

            res.status(201).json({
                message: "user has been registered",
                notif,
            });
        } catch (error) {
            // console.log(error.name);
            next(error);
            // console.log(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            // console.log(req.body);
            if (!email || !password) throw { name: `InvalidInput` };

            let user = await User.findOne({ where: { email } });
            if (!user) throw { name: `InvalidUser` };
            // console.log(user);

            let compare = comparePass(password, user.password);
            if (!compare) throw { name: `InvalidUser` };
            // console.log(compare);

            let token = createToken({ id: user.id });
            // console.log(token, "token");

            res.status(200).json({
                access_token: token,
            });
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }
}
module.exports = Controller;
