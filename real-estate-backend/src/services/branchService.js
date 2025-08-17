import { ApiFeatures } from '../utils/ApiFeatures.js'
import { AppError } from '../utils/AppError.js'

/**
 * Checks if the user has the necessary permissions to perform the requested action.
 * @param {Object} params - The parameters for the permission check.
 * @param {number} params.userId - The ID of the user performing the action.
 * @param {string} params.role - The role of the logged-in user.
 * @param {number} params.resourceId - The ID of the resource being accessed.
 * @param {string} params.resourceType - The type of the resource being accessed.
 * @param {string} params.action - The action being performed (e.g., 'update', 'delete').
 * @throws {AppError} - If the user does not have the necessary permissions
 * @returns {Promise<void>} - A promise that resolves if the user has permission, or rejects with an error.
 */
const checkPermission = ({
    userId,
    role,
    resourceId,
    resourceType,
    action,
}) => {
    if (
        !hasPermission({
            loggedInUserId: userId,
            requestedUserId: resourceId,
            loggedInUserRole: role,
            roleType: resourceType,
        })
    ) {
        throw new AppError({
            code: 401,
            success: false,
            message: `You're not authorized to ${action} this ${resourceType}'s details`,
        })
    }
}

const branchService = (Branch) => ({
    /**
     * Retrieves all properties.
     * @async
     * @function
     * @param {Branch} branch
     * @memberof branchService
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
     */

    async getAll(queryParams) {
        const features = new ApiFeatures(Branch.find(), queryParams)
            .filter()
            .sort()
            .limitFields()
            .paginate()

        return await features.query
    },

    /**
     * Retrieves an branch by the ID.
     * @async
     * @function
     * @memberof branchService
     * @param {string} branchId - The ID of the branch to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an branch object if found, or rejects with an error.
     */
    async getById(branchId) {
        return await Branch.getById(branchId)
    },

    /**
     * Retrieves an branch by the ID.
     * @async
     * @function
     * @memberof branchService
     * @param {string} branchId - The ID of the branch to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an branch object if found, or rejects with an error.
     */
    async findById(branchId) {
        return await Branch.findById(branchId)
    },

    /**
     * Updates a branch by its ID, ensuring the user has the necessary permissions.
     * @param {Object} params - The parameters for the update operation.
     * @param {number} params.branchId - The ID of the branch to be updated.
     * @param {Object} params.branch - The updated branch data.
     * @param {Object} params.user - The user performing the update operation.
     * @returns {Promise<Object>} - The updated branch.
     */
    async updateById({ branchId, branch }) {
        return await Branch.updateById(branchId, branch)
    },

    /**
     * Deletes a branch by its ID, ensuring the user has the necessary permissions.
     * @async
     * @function
     * @memberof Branch
     * @param {Object} params - The parameters for the delete operation.
     * @param {string} params.branchId - The ID of the branch to be deleted.
     * @returns {Promise<Object>} - A promise that resolves if the branch was deleted, or rejects with an error.
     */
    async deleteById({ branchId }) {
        return await Branch.deleteById(branchId)
    },

    /**
     * Creates a new branch.
     * @async
     * @function
     * @memberof properyService
     * @param {Object} branch - The branch object to create.
     * @returns {Promise<Object>} A promise that resolves to the created branch object, or rejects with an error.
     */
    async create(newBranch) {
        const branch = new Branch(newBranch)

        try {
            await branch.validate()
            const savedBranch = await branch.save()
            return savedBranch._doc
        } catch (error) {
            throw new AppError({
                code: 400,
                success: false,
                message: error.message,
            })
        }
    },
})

export default branchService
