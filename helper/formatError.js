const UNIQUE_ERROR_MESSAGE = {
    email: "Email already exists",
    username: "Username already exists",
};
const formateSequelizeError = (error) => {
    const errors = {};
    error.errors.forEach((err) => {
        // unieque constraint error
        if (error.name === "SequelizeUniqueConstraintError") {
            errors[err.path] =
                UNIQUE_ERROR_MESSAGE[err.path] || "Duplicate value";
        }
    });
    return errors;
};

module.exports = formateSequelizeError;
