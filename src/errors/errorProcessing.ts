import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ApiValidationError } from "./customErrors";
import { statusCodes } from "./httpStatusCodes";

export function userValidationError(error: ApiValidationError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof ApiValidationError) {
        res.status(statusCodes.UNPROCESSABLE_CONTENT);

        res.send({
            httpStatus: statusCodes.UNPROCESSABLE_CONTENT,
            message: JSON.parse(error.name),
        })
    };
    console.log("ERROR???")
    next(error);
}