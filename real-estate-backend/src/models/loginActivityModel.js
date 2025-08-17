import mongoose from 'mongoose'
import { loginActivitySchema } from '../schemas/loginActivitySchema.js'

loginActivitySchema.statics = {
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
        return await this.findOneAndUpdate(
            { userId },
            {
                ipAddress,
                userAgent,
                loginTime: new Date(),
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            },
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
        return await this.find({ userId })
    },
}

const LoginActivity = mongoose.model('loginActivity', loginActivitySchema)

export default LoginActivity
