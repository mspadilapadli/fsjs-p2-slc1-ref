// *sync
const bcrypt = require("bcryptjs");

let hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
};
let comparePassword = (passwordIput, PasswordDB) => {
    return bcrypt.compareSync(passwordIput, PasswordDB);
};

module.exports = { hashPassword, comparePassword };
