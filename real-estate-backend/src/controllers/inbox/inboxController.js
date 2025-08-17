import { isAgent } from '../../utils/accessControl.js'
import { verifyToken } from '../../utils/verifyToken.js'

/**
 * Inbox Controller.
 * @param {Object} inboxService - The inbox service object.
 * @returns {Object} The inbox controller object.
 */
export const inboxController = (inboxService) => ({
    /**
     * Retrieves all inboxs.
     * @async
     * @function getAll
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    getAll: async (req, res, next) => {
        const query = req.query || {}
        const token = req.headers.authorization.split(' ')[1]

        try {
            const { id, role } = verifyToken(token)

            if (isAgent(role)) {
                query.agentId = id
            }

            const inboxs = await inboxService.getAll(query)

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Inbox list has been successfully fetched!',
                result: inboxs.length,
                data: [...inboxs],
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Retrieves a inbox by its ID.
     * @async
     * @function getById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    getById: async (req, res, next) => {
        const { inboxId } = req.params

        try {
            const inbox = await inboxService.getById(inboxId)

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Inbox has been successfully fetched!',
                data: inbox,
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Creates a new inbox.
     * @async
     * @function create
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    create: async (req, res, next) => {
        try {
            await inboxService.create({
                ...req.body,
            })

            res.status(201).json({
                code: 201,
                success: true,
                message: 'New inbox has been added successfully!',
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Updates a inbox by its ID.
     * @async
     * @function updateById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    updateById: async (req, res, next) => {
        const { params, body: newInboxInfo } = req
        const { inboxId } = params

        try {
            const updatedInbox = await inboxService.updateById({
                inboxId,
                updateDetails: newInboxInfo,
            })

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Inbox has been updated successfully!',
                data: {
                    ...updatedInbox,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Deletes a inbox by its ID.
     * @async
     * @function deleteById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    deleteById: async (req, res, next) => {
        const {
            params: { inboxId },
        } = req

        try {
            await inboxService.deleteById(inboxId)

            res.status(204).json({
                code: 204,
                success: true,
                message: 'Inbox has been deleted successfully!',
            })
        } catch (error) {
            next(error)
        }
    },
})

export default inboxController
