import { FRONT_END_APP_URL } from '../config/index.js'
import { AppError } from '../utils/AppError.js'
import { comparePassword, hashPassword } from '../utils/generatePassword.js'
import { genereteRandomBytes } from '../utils/generateRandomByte.js'
import { generateAccessToken } from '../utils/generateToken.js'

/**
 * Creates and returns an authentication service.
 * @param {Object} User - The Mongoose model representing the user collection.
 * @param {Object} ResetPassword - The Mongoose model representing the reset password collection.
 * @param {Object} EmailService - The service for sending emails.
 * @returns {Object} The authentication service object.
 */
const authService = (User, ResetPassword, EmailService, ActivityService) => ({
    /**
     * Gets a user by email.
     * @async
     * @param {string} email - The email of the user.
     * @throws {AppError} If user is not found.
     * @returns {Promise<Object>} A promise that resolves with the user object.
     */
    async getUser(email) {
        const user = await User.getByKey({ email })

        if (!user) {
            throw new AppError({
                code: 404,
                success: false,
                message:
                    "Sorry, we couldn't find any user with the associated email address!",
            })
        }

        return user._doc
    },

    /**
     * Logs in a user with provided email and password.
     * @async
     * @param {string} email - The email of the user logging in.
     * @param {string} password - The password of the user logging in.
     * @param {string} ipAddress - The IP address of the user logging in.
     * @param {string} userAgent - The user agent of the user logging in.
     * @throws {AppError} If user is not found or password is invalid.
     * @returns {Promise<string>} A promise that resolves with an access token upon successful login.
     */
    async login({ email, password: plainPassword, ipAddress, userAgent }) {
        const {
            _id: id,
            password: hashedPassword,
            ...user
        } = await this.getUser(email)

        const isValidPassword = await comparePassword(
            plainPassword,
            hashedPassword,
        )

        if (!isValidPassword) {
            throw new AppError({
                code: 401,
                success: false,
                message: 'Invalid password!',
            })
        }

        const { firstName, lastName, email: userEmail, role, avatar } = user
        const fullName = firstName + ' ' + lastName
        const userRole = role.toLowerCase()

        const token = generateAccessToken({
            id,
            name: fullName,
            role: userRole,
            email: userEmail,
            avatar,
        })

        const loginActivity = await ActivityService.logLoginActivity(
            id,
            ipAddress,
            userAgent,
        )

        await User.findByIdAndUpdate(id, { activity: loginActivity._id })

        return {
            id,
            name: fullName,
            role: userRole,
            email: userEmail,
            token,
            avatar,
        }
    },

    /**
     * Requests to reset the user's password and sends an email with reset instructions.
     * @async
     * @param {string} email - The email of the user.
     * @throws {AppError} If user is not found.
     * @returns {Promise<void>} A promise that resolves upon successful sending of reset instructions email.
     */
    async requestForgotPassword(email) {
        const { _id: userId } = await this.getUser(email)

        const token = await genereteRandomBytes(20, 'hex')
        const requestedToken = await ResetPassword.createResetTokenToUser(
            userId.toString(),
            token,
        )

        if (!requestedToken) {
            throw new AppError({
                code: 500,
                message:
                    'Failed to create password reset token, please try again later!',
            })
        }

        const resetPasswordUrl = `${FRONT_END_APP_URL}/forget/setup-password/${userId}/${token}`
        try {
            await EmailService.send({
                email,
                subject: 'Reset your password',
                body: `Click the link below to reset your password: <a href="${resetPasswordUrl}">Reset your password</a>`,
            })
        } catch (error) {
            throw new AppError({
                code: 500,
                message: error.message,
            })
        }
    },

    /**
     * Requests to reset the user's password and sends an email with reset instructions.
     * @async
     * @param {string} oldPassword - The current password of the user.
     * @param {string} newPassword - The new password to set.
     * @param {string} userId - The ID of the user requesting the password reset.
     * @param {Object} req - The request object containing the logged-in user information.
     * @throws {AppError} If the user is not found, if the logged-in user does not match the requested user, or if the old password is invalid.
     * @returns {Promise<Object>} A promise that resolves with the updated user object.
     */
    async requestResetPassword({
        oldPassword,
        newPassword,
        requestUserId,
        loggedInUser,
    }) {
        const user = await User.findById(requestUserId)

        if (!user) {
            throw new AppError({
                code: 404,
                success: false,
                message: 'User not found!',
            })
        }

        console.log(loggedInUser, requestUserId)

        if (loggedInUser !== requestUserId) {
            throw new AppError({
                code: 403,
                success: false,
                message: 'You must log in to reset your password!',
            })
        }

        const isValidPassword = await comparePassword(
            oldPassword,
            user.password,
        )

        if (!isValidPassword) {
            throw new AppError({
                code: 401,
                success: false,
                message: 'Invalid old password!',
            })
        }

        user.password = await hashPassword(newPassword)

        await user.save()
        return user
    },

    /**
     * Updates the user's password after resetting it.
     * @async
     * @param {Object} options - The update options.
     * @param {number} options.userId - The ID of the user.
     * @param {string} options.token - The reset password token.
     * @param {string} options.password - The new password.
     * @throws {AppError} If user is not found or reset token is invalid.
     * @returns {Promise<void>} A promise that resolves upon successful update of the password.
     */
    async updateForogtPassword({ userId, token, password }) {
        const user = await User.findById(userId)

        const resetPasswordToken = await ResetPassword.findByUserIdAndToken({
            userId,
            token,
        })

        if (!resetPasswordToken) {
            throw new AppError({
                code: 400,
                success: false,
                message: 'Invalid or expired link',
            })
        }

        const hashedPassword = await hashPassword(password)
        user.password = hashedPassword

        await user.save()
        await ResetPassword.deleteOne({ userId })
    },
})

export default authService
