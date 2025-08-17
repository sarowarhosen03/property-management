import { AppError } from '../utils/AppError.js'
import { checkIsValidId, checkIsValidUUId } from '../utils/validatedStringId.js'

/**
 * Checks if the provided ID has a valid format.
 * @param {string} Id - Th ID which need to be validate.
 * @throws {AppError} Throws an error if the user ID format is invalid.
 * @returns {void}
 */
const validateResourceId = (Id, isUUID) =>
    isUUID ? checkIsValidUUId(Id) : checkIsValidId(Id)

/**
 * Checks if an user with the provided ID exists in the database.
 * @param {string} userId - The ID of the user to check.
 * @throws {AppError} Throws an error if the user with the given ID is not found.
 * @returns {Promise<void>}
 */
export const checkIfResourceExistsInService = async ({ Service, resourceId }) =>
    await Service.findById(resourceId)

/**
 * Helper function to send a resource not found response.
 * @param {Object} res - The response object.
 * @param {string} resourceId - The ID of the resource that was not found.
 */
const resourceNotFound = (res, resourceId) => {
    return res.status(404).json({
        code: 404,
        success: false,
        message: `Sorry, couldn't find any details associated with ${resourceId}`,
    })
}

/**
 * Middleware function to check if an user with the given ID exists.
 * @param {Object} req - The request object.
 * @param {Object} _res - The response object (unused).
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Calls the next middleware function if user exists, otherwise throws an error.
 */
export const checkResourceExistMiddleware = (
    Service,
    searchParamsKey,
    isUUID = false,
) => {
    return async (req, res, next) => {
        try {
            const resourceId = req.params[searchParamsKey]

            // if (!validateResourceId(resourceId, isUUID)) {
            //     return resourceNotFound(res, resourceId)
            // }

            const isResourceFound = await checkIfResourceExistsInService({
                Service,
                resourceId,
            })

            if (!isResourceFound) return resourceNotFound(res, resourceId)

            next()
        } catch (error) {
            next(error)
        }
    }
}
