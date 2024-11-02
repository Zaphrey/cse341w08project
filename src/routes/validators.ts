import { NextFunction, Request, Response } from "express";
import { check, query, body, validationResult, Result, param } from "express-validator";
import { StandardValidation } from "express-validator/lib/context-items";

export const createUserRules = () => {
    return [
        body("username", "Username must be between 4 and 20 characters.").isLength({ min: 4, max: 20 }),
        body("password", "Password must be at least 5 characters.").isLength({ min: 5 }),
        body("email", "Email must be a valid email.").isEmail(),
    ];
};

export const getUserRules = () => {
    return [
        param("id", "User Id must be numerical.").notEmpty().isNumeric()
    ]
}

export const updateUserRules = () => {
    return [
        param("id", "User Id must be numerical.").notEmpty().isNumeric(),
        query("username", "Username must be between 4 and 20 characters.").isLength({ min: 4, max: 20 }).optional(),
        query("password", "Password must be at least 5 characters.").isLength({ min: 5 }).optional(),
        query("email", "Email must be a valid email.").isEmail().optional(),
    ]
}

export const deleteUserRules = () => {
    return [
        param("id", "User Id must be numerical.").notEmpty().isNumeric(),
    ]
}

export const addMovieRules = () => {
    return [
        param("id", "User Id must be numerical.").notEmpty().isNumeric(),
        body("name").notEmpty(),
        body("genre").notEmpty(),
        body("maker").notEmpty(),
        body("cover").notEmpty(),
        body("date").notEmpty(),
        body("description").notEmpty().optional(),
    ]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return next()
    }

    const extractedErrors: Array<Object> = []
    errors.array().map(err => extractedErrors.push({ [err.type]: err.msg }))
    res.status(422).send(JSON.stringify(extractedErrors))
}