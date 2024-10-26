"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.deleteUserRules = exports.updateUserRules = exports.getUserRules = exports.createUserRules = void 0;
const express_validator_1 = require("express-validator");
const createUserRules = () => {
    return [
        (0, express_validator_1.body)("username", "Username must be between 4 and 20 characters.").isLength({ min: 4, max: 20 }),
        (0, express_validator_1.body)("password", "Password must be at least 5 characters.").isLength({ min: 5 }),
        (0, express_validator_1.body)("email", "Email must be a valid email.").isEmail(),
    ];
};
exports.createUserRules = createUserRules;
const getUserRules = () => {
    return [
        (0, express_validator_1.param)("id", "User Id must be numerical.").notEmpty().isNumeric()
    ];
};
exports.getUserRules = getUserRules;
const updateUserRules = () => {
    return [
        (0, express_validator_1.param)("id", "User Id must be numerical.").notEmpty().isNumeric(),
        (0, express_validator_1.query)("username", "Username must be between 4 and 20 characters.").isLength({ min: 4, max: 20 }).optional(),
        (0, express_validator_1.query)("password", "Password must be at least 5 characters.").isLength({ min: 5 }).optional(),
        (0, express_validator_1.query)("email", "Email must be a valid email.").isEmail().optional(),
    ];
};
exports.updateUserRules = updateUserRules;
const deleteUserRules = () => {
    return [
        (0, express_validator_1.param)("id", "User Id must be numerical.").notEmpty().isNumeric(),
    ];
};
exports.deleteUserRules = deleteUserRules;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.type]: err.msg }));
    res.status(422).send(JSON.stringify(extractedErrors));
};
exports.validate = validate;
