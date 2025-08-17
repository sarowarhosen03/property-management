/**
 * Contact Controller.
 * @param {Object} contactService - The contact service object.
 * @returns {Object} The contact controller object.
 */
export const contactController = (contactService) => ({
    /**
     * Retrieves all contacts.
     * @async
     * @function getAll
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    getAll: async (req, res, next) => {
        const query = req.query || {}

        try {
            const contacts = await contactService.getAll(query)

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Contact list has been successfully fetched!',
                result: contacts.length,
                data: [...contacts],
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Retrieves a contact by its ID.
     * @async
     * @function getById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    getById: async (req, res, next) => {
        const { contactId } = req.params

        try {
            const contact = await contactService.getById(contactId)

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Contact has been successfully fetched!',
                data: contact,
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Creates a new contact.
     * @async
     * @function create
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    create: async (req, res, next) => {
        try {
            await contactService.create({ ...req.body })
            res.status(201).json({
                code: 201,
                success: true,
                message: 'New contact has been added successfully!',
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Updates a contact by its ID.
     * @async
     * @function updateById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation completes.
     */
    updateById: async (req, res, next) => {
        const { user, params, body: newContactInfo } = req
        const { contactId } = params

        try {
            const updatedContact = await contactService.updateById({
                contactId,
                updateDetails: newContactInfo,
                user,
            })

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Contact has been updated successfully!',
                data: {
                    ...updatedContact,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * Deletes a contact by its ID.
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
            params: { contactId },
        } = req
        try {
            await contactService.deleteById({ contactId, user })

            res.status(204).json({
                code: 204,
                success: true,
                message: 'Contact has been deleted successfully!',
            })
        } catch (error) {
            next(error)
        }
    },
})

export default contactController
