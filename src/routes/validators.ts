import { ApiValidationError } from "@error/customErrors";
import { NextFunction, Request, Response } from "express";
import { check, query, body, validationResult, Result, param } from "express-validator";
import { StandardValidation } from "express-validator/lib/context-items";

//USER RULES///////////////////////////

export const createUserRules = () => {
    return [
        body("username", "Username must be between 4 and 20 characters.").isLength({ min: 4, max: 20 }),
        body("password", "Password must be at least 5 characters.").isLength({ min: 5 }),
        body("email", "Email must be a valid email.").isEmail(),
    ];
};

export const getUserRules = () => {
    return [
        param("id", "User id cannot be empty").notEmpty()
    ]
}

export const updateUserRules = () => {
    return [
        param("id", "User id cannot be empty").notEmpty(),
        query("username", "Username must be between 4 and 20 characters.").isLength({ min: 4, max: 20 }).optional(),
        query("password", "Password must be at least 5 characters.").isLength({ min: 5 }).optional(),
        query("email", "Email must be a valid email.").isEmail().optional(),
    ]
}

export const deleteUserRules = () => {
    return [
        param("id", "User id cannot be empty").notEmpty(),
    ]
}

//REVIEW RULES/////////////////////////

export const addReviewRules = () => {
    return [
        body("body", "Body message must be between 20 and 1000 characters").notEmpty().isLength({ min: 20, max: 1000 }),
        body("title", "Title must be between 5 and 30 characters").notEmpty().isLength({ min: 5, max: 30 }),
        body("rating", "Rating must be in range of 0-5").notEmpty().isFloat({ min: 0, max: 5}),
    ]
}

export const getUserReviewsRules = () => {
    return [
        param("id", "User id cannot be empty").notEmpty()
    ]
}

export const updateReviewRules = () => {
    return [
        query("body", "Body message must be between 20 and 1000 characters").notEmpty().isLength({ min: 20, max: 1000 }).optional(),
        query("title", "Title must be between 5 and 30 characters").notEmpty().isLength({ min: 5, max: 30 }).optional(),
        query("rating", "Rating must be in range of 0-5").notEmpty().isFloat({ min: 0, max: 5}).optional(),
    ]
}

export const deleteReviewRules = () => {
    return [
        param("id", "Review id cannot be empty").notEmpty()
    ]
}

//MOVIE RULES//////////////////////////

export const addMovieRules = () => {
    return [
        body("name", "Name cannot be empty").notEmpty(),
        body("genre", "Genre cannot be empty").notEmpty(),
        body("maker", "Maker cannot be empty").notEmpty(),  
        body("cover", "Cover cannot be empty").notEmpty(),
        body("date", "Date cannot be empty").notEmpty(),
        body("description", "Description must be between 20 and 1000 characters long").notEmpty().isLength({ min: 20, max: 1000 }),
        body("rating", "Rating cannot be empty").notEmpty(),
    ]
}

export const getMovieRules = () => {
    return [
        param("id", "Movie id cannot be empty").notEmpty()
    ]
}

export const updateMovieRules = () => {
    return [
        body("name", "Name cannot be empty").notEmpty().optional(),
        body("genre", "Genre cannot be empty").notEmpty().optional(),
        body("maker", "Maker cannot be empty").notEmpty().optional(),
        body("cover", "Cover cannot be empty").notEmpty().optional(),
        body("date", "Date cannot be empty").notEmpty().optional(),
        body("description", "Description must be between 20 and 1000 characters long").notEmpty().isLength({ min: 20, max: 1000 }).optional(),
        body("rating", "Rating cannot be empty").notEmpty().optional(),
    ]
}

export const deleteMovieRules = () => {
    return [
        param("id", "Movie id cannot be empty").notEmpty()
    ]
}

export const getMovieReviewsRules = () => {
    return [
        param("id", "Movie id cannot be empty").notEmpty()
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

export function verifyAPIData(req: Request): void {
    let result = validationResult(req);

    if (!result.isEmpty()) {
        throw new ApiValidationError(`${JSON.stringify(result, null, 4)}`)
    }
}