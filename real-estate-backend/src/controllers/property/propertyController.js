import { isAgent } from '../../utils/accessControl.js'
import { verifyToken } from '../../utils/verifyToken.js'

/**
 * Property Controller.
 * @param {Object} propertyService - The property service object.
 * @returns {Object} The property controller object.
 */
export const propertyController = (propertyService) => ({
    /**
     * Retrieves all properties.
     * @async
     * @function getAll
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    getAll: async (req, res, next) => {
        const { query = {} } = req
        const token = req.headers.authorization

        try {
            if (token) {
                const extractToken = req.headers.authorization.split(' ')[1]
                const { id, role } = verifyToken(extractToken)

                if (isAgent(role)) {
                    query.agentId = id
                }
            }

            const { total, properties, pagination } =
                await propertyService.getAll(query)

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Property list has been successfully fetched!',
                result: properties.length,
                total: total,
                data: [...properties],
                pagination: pagination,
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Retrieves a property by its ID.
     * @async
     * @function getById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    getById: async (req, res, next) => {
        const { propertyId } = req.params

        try {
            const property = await propertyService.getById(propertyId)

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Property has been successfully fetched!',
                data: property,
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Retrieves a property by its ID.
     * @async
     * @function view
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    view: async (req, res, next) => {
        const { propertyId } = req.params
        try {
            await propertyService.viewById(propertyId)
            res.status(200).json({
                code: 200,
                success: true,
                message: 'Property view count has been successfully updated!',
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Creates a new property.
     * @async
     * @function create
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    create: async (req, res, next) => {
        try {
            const { body } = req

            const property = await propertyService.create({
                ...body,
            })

            res.status(201).json({
                code: 201,
                success: true,
                message: 'New property has been added successfully!',
                data: {
                    ...property,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Updates a property by its ID.
     * @async
     * @function updateById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    updateById: async (req, res, next) => {
        const { user, params, body: property } = req
        const { propertyId } = params

        try {
            const updatedProperty = await propertyService.updateById({
                propertyId,
                property,
                user,
            })

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Property has been updated successfully!',
                data: {
                    ...updatedProperty,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Deletes a property by its ID.
     * @async
     * @function deleteById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    deleteById: async (req, res, next) => {
        const {
            user,
            params: { propertyId },
        } = req
        try {
            await propertyService.deleteById({ propertyId, user })

            res.status(204).json({
                code: 204,
                success: true,
                message: 'Property has been deleted successfully!',
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Likes a property by its ID.
     * @async
     * @function like
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    like: async (req, res, next) => {
        const { propertyId } = req.params
        const { actionType } = req.body

        try {
            await propertyService.like(propertyId, actionType)

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Property like has been successfully updated!',
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Shares a property by its ID.
     * @async
     * @function share
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    share: async (req, res, next) => {
        const { propertyId } = req.params

        try {
            await propertyService.share(propertyId)

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Property share has been successfully updated!',
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Duplicates a property by its ID.
     * @async
     * @function duplicateById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    duplicateById: async (req, res, next) => {
        const { propertyId } = req.params
        const { _id: propertyNewId, images } = req.body || {}

        try {
            const property = await propertyService.duplicateById(
                propertyId,
                images,
                propertyNewId,
            )

            res.status(200).json({
                code: 200,
                success: true,
                message: `${propertyId} has been duplicated successfully!`,
                data: {
                    ...property,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    getPropertyPrices: async (_req, res, next) => {
        try {
            const { maxPrice, minPrice } =
                await propertyService.getMaxMinPrices()

            res.status(200).json({
                code: 200,
                success: true,
                message: `Property minimum and maximum value succesfully calcualted!`,
                data: {
                    maxPrice,
                    minPrice,
                },
            })
        } catch (error) {
            next(error)
        }
    },
})

export default propertyController
