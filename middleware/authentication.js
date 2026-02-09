const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
    try {
        let getToken = req.headers.authorization;

        if (!getToken) throw { name: `Unauthorized` };

        let [bearer, token] = getToken.split(" ");

        if (bearer !== `Bearer`) throw { name: `Unauthorized` };

        let payload = verifyToken(token);

        if (!payload) throw { name: `Unauthorized` };

        let user = await User.findByPk(payload.id);
        if (!user) throw { name: `Unauthorized` };

        req.user = { id: user.id };

        next(); //next to authorize or ctrl
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = authentication;
