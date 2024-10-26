export class BaseError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(name: string, statusCode: number, isOperational: boolean, message: string) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.message = message;
        this.statusCode = 1;
        this.isOperational = true;
        Error.captureStackTrace(this);
    }
}