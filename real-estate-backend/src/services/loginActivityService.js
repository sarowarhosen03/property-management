const loginActivityService = (LoginActivity) => ({
    /**
     * Logs a user's login activity.
     * @async
     * @function
     * @param {string} userId - The ID of the user logging in.
     * @param {string} ipAddress - The IP address of the user logging in.
     * @param {string} userAgent - The user agent of the user logging in.
     * @returns {Promise<Object>} A promise that resolves to the created login activity object.
     */
    async logLoginActivity(userId, ipAddress, userAgent) {
        return await LoginActivity.logLoginActivity(
            userId,
            ipAddress,
            userAgent,
        )
    },

    /**
     * Retrieves recent login activities for a user.
     * @async
     * @function
     * @param {string} userId - The ID of the user.
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of login activity objects.
     */
    async getRecentLoginActivities(userId) {
        return await LoginActivity.getRecentLoginActivities(userId)
    },
})

export default loginActivityService
