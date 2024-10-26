import { BaseError } from "./baseError";
import { statusCodes } from "./httpStatusCodes";

export class Api404Error extends BaseError {
    constructor(
        name = "404Error",
        statusCode = statusCodes.NOT_FOUND,
        description = "Not found.",
        isOperational = true,
    ) {
        super(name, statusCode, isOperational, description);
    }
}

export class ApiValidationError extends BaseError {
    constructor(
        name = "ValidationError",
        statusCode = statusCodes.UNPROCESSABLE_CONTENT,
        description = "Data could not be validated.",
        isOperational = true,
    ) {
        super(name, statusCode, isOperational, description);
    }
}