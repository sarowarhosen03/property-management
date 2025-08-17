export class AppError extends Error {
    constructor({
        code = 500,
        success = false,
        message = 'Something went wrong, Please try again later!',
        isOperational = true,
    }) {
        super(message)
        this.code = code
        this.success = success
        this.isOperational = isOperational
        Error.captureStackTrace(this, this.constructor)
    }
}
