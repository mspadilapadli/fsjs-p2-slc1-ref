const { Grocery } = require("../models");
const authorization = async (req, res, next) => {
    try {
        let data = await Grocery.findByPk(req.params.id);
        if (!data) throw { name: `notFound` };
        if (data.UserId !== req.user.id) throw { name: `Forbidden` };
        next();
    } catch (error) {
        next(error);
    }
};
module.exports = authorization;
