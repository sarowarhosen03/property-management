// middlewares/globalErrorHandler.js
import { NODE_ENV } from '../config/index.js'

const productionError = (err, res) => {
    const { isOperational, code = 500, success = false, message } = err

    if (isOperational) {
        return res.status(code).json({
            code,
            success,
            message,
        })
    }

    return res.status(500).json({
        code: 500,
        success: false,
        message: 'Something went wrong, Please try again later!',
    })
}

const castErrorHandler = (err, res) => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return res.status(400).json({
        code: 400,
        success: false,
        message,
    })
}

const duplicateErrorHandler = (err, res) => {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0]
    const message = `Field value: ${value} already exists. Please use another.`
    return res.status(400).json({
        code: 400,
        success: false,
        message,
    })
}

const validationErrorHandler = (err, res) => {
    const errors = Object.values(err.errors).map((el) => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`
    return res.status(400).json({
        code: 400,
        success: false,
        message,
    })
}

const developmentError = (err, res) => {
    const { code = 500, success, message, stack } = err
    console.log(err)
    return res.status(code).json({
        code,
        success,
        message,
        stack,
    })
}

export const globalErrorHandler = (err, req, res, next) => {
    if (err.name === 'CastError') return castErrorHandler(err, res)
    if (err.code === 11000) return duplicateErrorHandler(err, res)
    if (err.name === 'ValidationError') return validationErrorHandler(err, res)

    if (NODE_ENV === 'development') return developmentError(err, res)

    return productionError(err, res)
}
