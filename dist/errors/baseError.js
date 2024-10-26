"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(name, statusCode, isOperational, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.message = message;
        this.statusCode = 1;
        this.isOperational = true;
        Error.captureStackTrace(this);
    }
}
exports.BaseError = BaseError;
