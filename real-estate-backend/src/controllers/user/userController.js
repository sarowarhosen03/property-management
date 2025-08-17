import { AppError } from '../../utils/AppError.js'

export const userController = (userService) => ({
    /**
     * Retrieves all users.
     * @async
     * @function getAll
     * @param {Object} _req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     * @throws {AppError} - If an error occurs during the operation.
     */
    getAll: async (_req, res, next) => {
        try {
            const users = await userService.getAll()

            res.status(200).json({
                code: 200,
                success: true,
                message: 'User list has been successfully fetched!',
                data: [...users],
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Retrieves an user by their ID.
     * @async
     * @function getById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     * @throws {AppError} - If an error occurs during the operation.
     */
    getById: async (req, res, next) => {
        const { userId } = req.params
        try {
            const user = await userService.getById(userId)

            res.status(200).json({
                code: 200,
                success: true,
                message: 'User has been successfully fetched!',
                data: {
                    ...user,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Creates a new user.
     * @async
     * @function create
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     * @throws {AppError} - If an error occurs during the operation.
     */
    create: async (req, res, next) => {
        try {
            const { email, password, ...newUser } = await userService.create({
                ...req.body,
            })

            res.status(201).json({
                code: 201,
                success: true,
                message: 'New user has been added successfully!',
                data: {
                    ...newUser._doc,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Updates an user by their ID.
     * @async
     * @function updateById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     * @throws {AppError} - If an error occurs during the operation.
     */
    updateById: async (req, res, next) => {
        const {
            body,
            params: { userId },
        } = req
        try {
            const updatedUser = await userService.updateById(userId, {
                ...body,
            })

            res.status(200).json({
                code: 200,
                success: true,
                message: 'User has been updated successfully!',
                data: {
                    ...updatedUser._doc,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Deletes an user by their ID.
     * @async
     * @function deleteById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     * @throws {AppError} - If an error occurs during the operation.
     */
    deleteById: async (req, res, next) => {
        const { userId } = req.params
        try {
            await userService.deleteById(userId)

            res.status(204).json({
                code: 204,
                success: true,
                message: 'User has been deleted successfully!',
            })
        } catch (error) {
            next(error)
        }
    },

    async verifySetupToken(_, res, next) {
        try {
            await userService.verifyPasswordSetupToken(token)
            res.status(200).json({
                code: 200,
                success: true,
                message: 'Token is valid.',
            })
        } catch (error) {
            next(error)
        }
    },

    async setPassword(req, res, next) {
        try {
            const { userId, password, token } = req.body
            await userService.setPassword({ userId, password, token })

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Password set successfully.',
            })
        } catch (error) {
            next(
                new AppError({
                    code: error.code || 500,
                    success: false,
                    message:
                        error.message ||
                        'An error occurred while setting the password.',
                }),
            )
        }
    },
})

export default userController
