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
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) throw { name: `InvalidInput` };

            let user = await User.findOne({ where: { email } });
            if (!user) throw { name: `InvalidUser` };

            let compare = comparePass(password, user.password);
            if (!compare) throw { name: `InvalidUser` };

            let token = createToken({ id: user.id });

            res.status(200).json({
                access_token: token,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getGroceries(req, res, next) {
        try {
            let data = await Grocery.findAll();

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: `Internal Server Error` });
        }
    }

    static async postGroceries(req, res, next) {
        try {
            const { title, price, tag, imageUrl } = req.body;

            let data = await Grocery.create({
                title,
                price,
                tag,
                imageUrl,
                UserId: req.user.id, //need to req.user.id
            });
            res.status(201).json({ message: `data created`, data });
        } catch (error) {
            next(error);
        }
    }

    static async putGroceries(req, res, next) {
        try {
            const { id } = req.params;
            const { title, price, tag, imageUrl, UserId } = req.body;
            let data = await Grocery.findByPk(id);
            if (!data) throw { name: `notFound` };
            let dataUpdate = {
                title,
                price,
                tag,
                imageUrl,
                UserId: req.user.id, //need to req.user.id
            };
            await Grocery.update(dataUpdate, {
                where: { id },
            });
            let updated = await Grocery.findByPk(id);
            res.status(200).json({
                message: "Grocery item has been updated",
                updated,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteGroceries(req, res, next) {
        try {
            const { id } = req.params;
            let data = await Grocery.findByPk(id);
            if (!data) throw { name: `Data not found` };
            await Grocery.destroy({ where: { id } });
            res.status(200).json({
                message: `Grocery ${data.title} item has been deleted`,
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = Controller;
