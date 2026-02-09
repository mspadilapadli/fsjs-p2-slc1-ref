const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
    try {
        let getToken = req.headers.authorization;

        if (!getToken) throw { name: `Unauthorized` };

        let [bearer, token] = getToken.split(" ");
        // console.log(bearer);

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = authentication;
