"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiValidationError = exports.Api404Error = void 0;
const baseError_1 = require("./baseError");
const httpStatusCodes_1 = require("./httpStatusCodes");
class Api404Error extends baseError_1.BaseError {
    constructor(name = "404Error", statusCode = httpStatusCodes_1.statusCodes.NOT_FOUND, description = "Not found.", isOperational = true) {
        super(name, statusCode, isOperational, description);
    }
}
exports.Api404Error = Api404Error;
class ApiValidationError extends baseError_1.BaseError {
    constructor(name = "ValidationError", statusCode = httpStatusCodes_1.statusCodes.UNPROCESSABLE_CONTENT, description = "Data could not be validated.", isOperational = true) {
        super(name, statusCode, isOperational, description);
    }
}
exports.ApiValidationError = ApiValidationError;
