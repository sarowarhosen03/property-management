/**
 * Checks if the user has the necessary permissions to perform the requested action.
 * @param {Object} params - The parameters for the permission check.
 * @param {number} params.loggedInUserId - The ID of the user performing the action.
 * @param {number} params.matchesWithresourceId - The ID of the user whose data is being accessed.
 * @param {string} params.loggedInUserRole - The role of the logged-in user.
 * @param {string} params.roleType - The type of role required for the action.
 * @returns {boolean} - True if the user has permission, false otherwise.
 */

const ADMIN_ROLE = ['admin', 'manager', 'director']

const hasPermission = ({
    loggedInUserId,
    loggedInUserRole,
    matchesWithresourceId,
}) =>
    ADMIN_ROLE.includes(loggedInUserRole.toLowerCase()) ||
    loggedInUserId == matchesWithresourceId

/**
 * Checks if the given role is 'agent'.
 *
 * @param {string} role - The role of the user.
 * @returns {boolean} - Returns true if the role is 'agent', otherwise false.
 */
const isAgent = (role) => {
    const normalizedRole = String(role).toLowerCase()
    return normalizedRole === 'agent'
}

/**
 * Checks if the given role is 'agent'.
 *
 * @param {string} role - The role of the user.
 * @returns {boolean} - Returns true if the role is 'agent', otherwise false.
 */
const isAdmin = (role) => {
    const normalizedRole = String(role).toLowerCase()
    return ADMIN_ROLE.includes(normalizedRole)
}

/**
 * Checks if the provided userId matches the owner of the resource.
 *
 * @param {string | number} resourceOwnerId - The ID of the resource owner.
 * @param {string | number} userIdToCheck - The ID of the user to check ownership against.
 * @returns {boolean} - Returns true if the user is the owner of the resource, otherwise false.
 */
const isResourceOwner = (resourceOwnerId, userIdToCheck) => {
    return String(resourceOwnerId) === String(userIdToCheck)
}

export { hasPermission, isAdmin, isAgent, isResourceOwner }
