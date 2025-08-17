import { UAParser } from 'ua-parser-js'

const authController = (authService) => ({
    /**
     * @description This function handles the login process for the user.
     * @param {Object} req - Express request object containing the user's login credentials.
     * @param {Object} res - Express response object to send the login response.
     * @param {Function} next - Express middleware function to handle errors.
     * @returns {Promise<void>} - Resolves when the login process is completed.
     * @throws {Error} - If an error occurs during the login process.
     */
    login: async (req, res, next) => {
        const { email, password } = req.body
        const ipAddress = req.ip

        const parser = new UAParser()
        const ua = req.headers['user-agent']
        const info = parser.setUA(ua).getResult()

        try {
            const user = await authService.login({
                email,
                password,
                ipAddress,
                userAgent: info?.browser?.name,
            })

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Successfully logged in!',
                data: {
                    ...user,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * @description This function handles the request for a forgotten password.
     * @param {Object} req - Express request object containing the user's email.
     * @param {Object} res - Express response object to send the reset password link response.
     * @param {Function} next - Express middleware function to handle errors.
     * @returns {Promise<void>} - Resolves when the reset password link is sent.
     * @throws {Error} - If an error occurs during the reset password link process.
     */
    requestForgotPassword: async (req, res, next) => {
        const { email } = req.body

        try {
            await authService.requestForgotPassword(email)
            res.status(200).json({
                code: 200,
                success: true,
                message: `Successfully reset password link has been sent to ${email}`,
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * @description This function handles the update of a forgotten password.
     * @param {Object} req - Express request object containing the user's ID and token.
     * @param {Object} res - Express response object to send the updated password response.
     * @param {Function} next - Express middleware function to handle errors.
     * @returns {Promise<void>} - Resolves when the password is updated.
     * @throws {Error} - If an error occurs during the update password process.
     */
    updateForogtPassword: async (req, res, next) => {
        const { userId, token } = req.params
        const { password } = req.body

        try {
            await authService.updateForogtPassword({ userId, token, password })

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Successfully updated password!',
            })
        } catch (error) {
            next(error)
        }
    },

    /**
     * @description This function handles the request for a reset password.
     * @param {Object} req - Express request object containing the user's old password, new password, and ID.
     * @param {Object} res - Express response object to send the reset password response.
     * @param {Function} next - Express middleware function to handle errors.
     * @returns {Promise<void>} - Resolves when the password is reset.
     * @throws {Error} - If an error occurs during the reset password process.
     */
    requestResetPassword: async (req, res, next) => {
        const { oldPassword, newPassword, userId: requestUserId } = req.body
        const { id: loggedInUser } = req.user

        try {
            await authService.requestResetPassword({
                oldPassword,
                newPassword,
                requestUserId,
                loggedInUser,
            })

            res.status(200).json({
                code: 200,
                success: true,
                message: 'Your password has been reset successfully!',
            })
        } catch (error) {
            next(error)
        }
    },
})

export default authController
