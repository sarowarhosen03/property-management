import { ADMIN_EMAIL } from '../config/index.js'
import { AppError } from '../utils/AppError.js'
import { hasPermission } from '../utils/accessControl.js'

/**
 * Checks if the user has the necessary permissions to perform the requested action.
 * @param {Object} params - The parameters for the permission check.
 * @param {number} params.userId - The ID of the user performing the action.
 * @param {string} params.role - The role of the logged-in user.
 * @param {number} params.resourceId - The ID of the resource being accessed.
 * @param {string} params.resourceName - The type of the resource being accessed.
 * @param {string} params.action - The action being performed (e.g., 'update', 'delete').
 * @throws {AppError} - If the user does not have the necessary permissions
 * @returns {Promise<void>} - A promise that resolves if the user has permission, or rejects with an error.
 */
const checkHasToPermissionModifyToDoc = ({
    userId,
    role,
    matchesWithresourceId,
    resourceName,
    action,
}) => {
    if (
        !hasPermission({
            loggedInUserId: userId,
            loggedInUserRole: role,
            matchesWithresourceId,
            roleType: resourceName,
        })
    ) {
        throw new AppError({
            code: 401,
            success: false,
            message: `You're not authorized to ${action} this ${resourceName}'s details`,
        })
    }
}

const contactService = (Contact, Email) => ({
    /**
     * Retrieves all properties.
     * @async
     * @function
     * @param {Contact} contact
     * @memberof contactService
     * @returns {Promise<Array<Object>} A promise that resolves to an array of user objects.
     */

    async getAll(query) {
        return await Contact.getAll(query)
    },

    /**
     * Retrieves an contact by the ID.
     * @async
     * @function
     * @memberof contactService
     * @param {string} contactId - The ID of the contact to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an contact object if found, or rejects with an error.
     */
    async getById(contactId) {
        return await Contact.getById(contactId)
    },

    /**
     * Retrieves an contact by the ID.
     * @async
     * @function
     * @memberof contactService
     * @param {string} contactId - The ID of the contact to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an contact object if found, or rejects with an error.
     */
    async findById(contactId) {
        return await Contact.findById(contactId)
    },

    /**
     * Updates a contact by its ID, ensuring the user has the necessary permissions.
     * @param {Object} params - The parameters for the update operation.
     * @param {number} params.contactId - The ID of the contact to be updated.
     * @param {Object} params.contact - The updated contact data.
     * @param {Object} params.user - The user performing the update operation.
     * @returns {Promise<Object>} - The updated contact.
     */
    async updateById({ contactId, updateDetails, user }) {
        const { userId: loggedInUserId, role: loggedInUserRole } = user
        const contactInfo = await this.getById(contactId)

        const agentId = contactInfo?.agentId

        checkHasToPermissionModifyToDoc({
            userId: loggedInUserId,
            role: loggedInUserRole,
            matchesWithresourceId: agentId,
            resourceName: 'Contact',
            action: 'update',
        })

        return await Contact.updateById(contactId, updateDetails)
    },

    /**
     * Deletes a contact by its ID, ensuring the user has the necessary permissions.
     * @async
     * @function
     * @memberof Contact
     * @param {Object} params - The parameters for the delete operation.
     * @param {string} params.contactId - The ID of the contact to be deleted.
     * @param {Object} params.user - The user performing the delete operation.
     * @returns {Promise<Object>} - A promise that resolves if the contact was deleted, or rejects with an error.
     */
    async deleteById({ contactId, user }) {
        const { agent_id: agentId } = await this.getById(contactId)

        checkHasToPermissionModifyToDoc({
            userId: user.userId,
            role: user.role,
            matchesWithresourceId: agentId,
            resourceName: 'employee',
            action: 'delete',
        })

        return await Contact.deleteById(contactId)
    },

    /**
     * Creates a new contact.
     * @async
     * @function
     * @memberof properyService
     * @param {Object} contact - The contact object to create.
     * @returns {Promise<Object>} A promise that resolves to the created contact object, or rejects with an error.
     */
    async create(newContact) {
        const contact = new Contact(newContact)

        try {
            await contact.validate()
        } catch (error) {
            throw new AppError({
                code: 400,
                success: false,
                message: error.message,
            })
        }

        await contact.save()

        const {
            email: buyerEmail,
            phone,
            comment,
            fullName,
            attachments,
        } = contact

        const emailBody = `
                <strong>Contact us</strong><br />
                Name: ${fullName} <br />
                Email: ${buyerEmail} <br />
                Phone: ${phone} <br />
                Comment: ${comment},
            `

        const emailOptions = {
            email: ADMIN_EMAIL,
            subject: `Contact us`,
            body: emailBody,
        }

        if (attachments && attachments.length > 0) {
            emailOptions.attachments = attachments.map((file) => ({
                filename: file.split('/').pop(),
                path: file,
            }))
        }

        try {
            await Email.send(emailOptions)
        } catch (error) {
            throw new AppError({
                code: 500,
                success: false,
                message: error,
            })
        }
    },
})

export default contactService
