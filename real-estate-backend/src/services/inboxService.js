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

const inboxService = (Inbox, User, Email) => ({
    /**
     * Retrieves all properties.
     * @async
     * @function
     * @param {inbox} Inbox
     * @memberof inboxService
     * @returns {Promise<Array<Object>} A promise that resolves to an array of user objects.
     */

    async getAll(query) {
        return await Inbox.getAll(query)
    },

    /**
     * Retrieves an inbox by the ID.
     * @async
     * @function
     * @memberof inboxService
     * @param {string} inboxId - The ID of the inbox to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an inbox object if found, or rejects with an error.
     */
    async getById(inboxId) {
        return await Inbox.getById(inboxId)
    },

    /**
     * Retrieves an inbox by the ID.
     * @async
     * @function
     * @memberof inboxService
     * @param {string} inboxId - The ID of the inbox to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an inbox object if found, or rejects with an error.
     */
    async findById(inboxId) {
        return await Inbox.findById(inboxId)
    },

    /**
     * Updates a inbox by its ID, ensuring the user has the necessary permissions.
     * @param {Object} params - The parameters for the update operation.
     * @param {number} params.inboxId - The ID of the inbox to be updated.
     * @param {Object} params.inbox - The updated inbox data.
     * @param {Object} params.user - The user performing the update operation.
     * @returns {Promise<Object>} - The updated inbox.
     */
    async updateById({ inboxId, updateDetails }) {
        return await Inbox.updateById(inboxId, updateDetails)
    },

    /**
     * Deletes a inbox by its ID, ensuring the user has the necessary permissions.
     * @async
     * @function
     * @memberof inbox
     * @param {Object} params - The parameters for the delete operation.
     * @param {string} params.inboxId - The ID of the inbox to be deleted.
     * @param {Object} params.user - The user performing the delete operation.
     * @returns {Promise<Object>} - A promise that resolves if the inbox was deleted, or rejects with an error.
     */
    async deleteById(inboxId) {
        return await Inbox.deleteById(inboxId)
    },

    /**
     * Creates a new inbox.
     * @async
     * @function
     * @memberof properyService
     * @param {Object} inbox - The inbox object to create.
     * @returns {Promise<Object>} A promise that resolves to the created inbox object, or rejects with an error.
     */
    async create(newInbox) {
        const inbox = new Inbox(newInbox)

        try {
            await inbox.validate()
        } catch (error) {
            return new AppError({
                code: 400,
                message: error.message,
            })
        }

        const savedInbox = await inbox.save()

        const { agentId } = savedInbox

        const agent = await User.getById(agentId.toString())

        if (agent) {
            const { email: agentEmail } = agent
            const { email: buyerEmail, phone, comment, fullName } = inbox

            const emailBody = `
                <strong>Property Inquiry</strong><br />
                Name: ${fullName} <br />
                Email: ${buyerEmail} <br />
                Phone: ${phone} <br />
                Comment: ${comment}
            `

            try {
                await Email.send({
                    email: agentEmail,
                    subject: `New Property Inquiry: ${inbox.propertyId}`,
                    body: emailBody,
                })
            } catch (error) {
                throw new AppError({
                    code: 500,
                    success: false,
                    message: error,
                })
            }
        }
    },
})

export default inboxService
