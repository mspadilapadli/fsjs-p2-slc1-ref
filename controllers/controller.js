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
}
module.exports = Controller;
