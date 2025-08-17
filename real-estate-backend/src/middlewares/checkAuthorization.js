import { AppError } from '../utils/AppError.js'

const ADMINROLES = ['admin', 'manager', 'director']

/**
 * this will check the condtion if true then it will throw an error if false then it will pass to the next midddle
 * @param {boolean} condtion - the condition which should match
 * @param {Function} next - The next middleware function
 */

const createError = (condtion, next) => {
    if (condtion) {
        return next(
            new AppError({
                code: 403,
                success: false,
                message: 'You are not authorized to access this resource',
            }),
        )
    }

    next()
}

/**
 * Checks if the user's role is authorized to access the resource.
 * If the user's role is not authorized, it returns a 403 Forbidden response.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const checkAuthorization = (req, _res, next) => {
    const { role } = req.user
    if (!ADMINROLES.includes(role)) {
        return createError(true, next)
    }
    next()
}

/**
 * Checks if the user's role is authorized to access the resource.
 * If the user's role is not authorized, it returns a 403 Forbidden response.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const checkAuthorizationWithRoles = (allowedRoles) => {
    return (req, _res, next) => {
        const userRole = req.user.role

        createError((!allowedRoles.includes(userRole), next))
    }
}

/**
 *  Checks if the user's role is authorized to access the resource
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {Function} next - The next middleware function.
 */

const checkUserAuthorization = (req, _res, next) => {
    const { userId } = req.params
    const { id: loggedInUserId, role } = req.user

    createError(!role == 'agent' && !userId === loggedInUserId, next)
}

/**
 * Middleware to check if the logged-in agent can access the resource.
 * Optionally allows admin, manager, and director to access if `canViewAdmin` is enabled.
 * @param {boolean} canViewAdmin - Whether to allow admin, manager, and director to access.
 */
const checkAgentAuthorization = (canViewAdmin = false) => {
    return (req, _res, next) => {
        const { role, id: loggedInUserId } = req.user
        const { userId } = req.body

        if (canViewAdmin) {
            if (ADMINROLES.includes(role)) {
                return next()
            }
        }

        if (role === 'agent' && userId === loggedInUserId) {
            return next()
        }

        createError(true, next)
    }
}

export {
    checkAgentAuthorization,
    checkAuthorization,
    checkAuthorizationWithRoles,
    checkUserAuthorization,
}
