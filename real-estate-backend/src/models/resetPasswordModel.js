import mongoose from 'mongoose'
import { resetPasswordSchema } from '../schemas/resetPasswordSchema.js'
import { AppError } from '../utils/AppError.js'

resetPasswordSchema.statics = {
    async isUserFound(userId) {
        const user = await this.findById(userId)
        if (!user) {
            throw new AppError({
                code: 404,
                success: false,
                message: `User with ID ${userId} not found`,
            })
        }
    },
    /**
     * @async
     * @function
     * @memberof UserModel
     * @param {Number} userId - The id of the user to update.
     * @param {String} token - The token string that will be used to reset password
     * @returns @returns {Promise<Object>} A promise that resolves to the updated user object.
     */
    async createResetTokenToUser(userId, token) {
        const user = await this.findOneAndUpdate(
            { userId: userId },
            { token: token },
            { upsert: true, new: true },
        )
        return user
    },

    async findByUserIdAndToken(key) {
        return await this.findOne(key)
    },
}

const ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema)

export default ResetPassword
