"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.getMovieReviewsRules = exports.deleteMovieRules = exports.updateMovieRules = exports.getMovieRules = exports.addMovieRules = exports.deleteReviewRules = exports.updateReviewRules = exports.getUserReviewsRules = exports.addReviewRules = exports.deleteUserRules = exports.updateUserRules = exports.getUserRules = exports.createUserRules = void 0;
exports.verifyAPIData = verifyAPIData;
const customErrors_1 = require("../errors/customErrors");
const express_validator_1 = require("express-validator");
//USER RULES///////////////////////////
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
        (0, express_validator_1.param)("id", "User id cannot be empty").notEmpty()
    ];
};
exports.getUserRules = getUserRules;
const updateUserRules = () => {
    return [
        (0, express_validator_1.param)("id", "User id cannot be empty").notEmpty(),
        (0, express_validator_1.query)("username", "Username must be between 4 and 20 characters.").isLength({ min: 4, max: 20 }).optional(),
        (0, express_validator_1.query)("password", "Password must be at least 5 characters.").isLength({ min: 5 }).optional(),
        (0, express_validator_1.query)("email", "Email must be a valid email.").isEmail().optional(),
    ];
};
exports.updateUserRules = updateUserRules;
const deleteUserRules = () => {
    return [
        (0, express_validator_1.param)("id", "User id cannot be empty").notEmpty(),
    ];
};
exports.deleteUserRules = deleteUserRules;
//REVIEW RULES/////////////////////////
const addReviewRules = () => {
    return [
        (0, express_validator_1.body)("body", "Body message must be between 20 and 1000 characters").notEmpty().isLength({ min: 20, max: 1000 }),
        (0, express_validator_1.body)("title", "Title must be between 5 and 30 characters").notEmpty().isLength({ min: 5, max: 30 }),
        (0, express_validator_1.body)("rating", "Rating must be in range of 0-5").notEmpty().isFloat({ min: 0, max: 5 }),
    ];
};
exports.addReviewRules = addReviewRules;
const getUserReviewsRules = () => {
    return [
        (0, express_validator_1.param)("id", "User id cannot be empty").notEmpty()
    ];
};
exports.getUserReviewsRules = getUserReviewsRules;
const updateReviewRules = () => {
    return [
        (0, express_validator_1.body)("body", "Body message must be between 20 and 1000 characters").notEmpty().isLength({ min: 20, max: 1000 }).optional(),
        (0, express_validator_1.body)("title", "Title must be between 5 and 30 characters").notEmpty().isLength({ min: 5, max: 30 }).optional(),
        (0, express_validator_1.body)("rating", "Rating must be in range of 0-5").notEmpty().isFloat({ min: 0, max: 5 }).optional(),
    ];
};
exports.updateReviewRules = updateReviewRules;
const deleteReviewRules = () => {
    return [
        (0, express_validator_1.param)("id", "Review id cannot be empty").notEmpty()
    ];
};
exports.deleteReviewRules = deleteReviewRules;
//MOVIE RULES//////////////////////////
const addMovieRules = () => {
    return [
        (0, express_validator_1.body)("name", "Name cannot be empty").notEmpty(),
        (0, express_validator_1.body)("genre", "Genre cannot be empty").notEmpty(),
        (0, express_validator_1.body)("maker", "Maker cannot be empty").notEmpty(),
        (0, express_validator_1.body)("cover", "Cover cannot be empty").notEmpty(),
        (0, express_validator_1.body)("date", "Date cannot be empty").notEmpty(),
        (0, express_validator_1.body)("description", "Description must be between 20 and 1000 characters long").notEmpty().isLength({ min: 20, max: 1000 }),
        (0, express_validator_1.body)("rating", "Rating cannot be empty").notEmpty(),
    ];
};
exports.addMovieRules = addMovieRules;
const getMovieRules = () => {
    return [
        (0, express_validator_1.param)("id", "Movie id cannot be empty").notEmpty()
    ];
};
exports.getMovieRules = getMovieRules;
const updateMovieRules = () => {
    return [
        (0, express_validator_1.body)("name", "Name cannot be empty").notEmpty().optional(),
        (0, express_validator_1.body)("genre", "Genre cannot be empty").notEmpty().optional(),
        (0, express_validator_1.body)("maker", "Maker cannot be empty").notEmpty().optional(),
        (0, express_validator_1.body)("cover", "Cover cannot be empty").notEmpty().optional(),
        (0, express_validator_1.body)("date", "Date cannot be empty").notEmpty().optional(),
        (0, express_validator_1.body)("description", "Description must be between 20 and 1000 characters long").notEmpty().isLength({ min: 20, max: 1000 }).optional(),
        (0, express_validator_1.body)("rating", "Rating cannot be empty").notEmpty().optional(),
    ];
};
exports.updateMovieRules = updateMovieRules;
const deleteMovieRules = () => {
    return [
        (0, express_validator_1.param)("id", "Movie id cannot be empty").notEmpty()
    ];
};
exports.deleteMovieRules = deleteMovieRules;
const getMovieReviewsRules = () => {
    return [
        (0, express_validator_1.param)("id", "Movie id cannot be empty").notEmpty()
    ];
};
exports.getMovieReviewsRules = getMovieReviewsRules;
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
function verifyAPIData(req) {
    let result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        throw new customErrors_1.ApiValidationError(`${JSON.stringify(result, null, 4)}`);
    }
}
