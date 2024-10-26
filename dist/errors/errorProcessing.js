"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationError = userValidationError;
const customErrors_1 = require("./customErrors");
const httpStatusCodes_1 = require("./httpStatusCodes");
function userValidationError(error, req, res, next) {
    if (error instanceof customErrors_1.ApiValidationError) {
        res.status(httpStatusCodes_1.statusCodes.UNPROCESSABLE_CONTENT);
        res.send({
            httpStatus: httpStatusCodes_1.statusCodes.UNPROCESSABLE_CONTENT,
            message: JSON.parse(error.name),
        });
    }
    ;
    console.log("ERROR???");
    next(error);
}
