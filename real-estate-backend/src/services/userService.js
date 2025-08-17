import { AppError } from '../utils/AppError.js'
import { hashPassword } from '../utils/generatePassword.js'
import { genereteRandomBytes } from '../utils/generateRandomByte.js'

const userService = (User, Email) => ({
    /**
     * Retrieves all users.
     * @async
     * @function
     * @memberof userService
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
     */
    async getAll() {
        return await User.getAll()
    },

    /**
     * Retrieves an user by their ID.
     * @async
     * @function
     * @memberof userService
     * @param {string} userId - The ID of the user to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an user object if found, or rejects with an error.
     */
    async getById(userId) {
        return await User.getById(userId)
    },

    /**
     * Retrieves an user by their ID.
     * @async
     * @function
     * @memberof userService
     * @param {string} userId - The ID of the user to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an user object if found, or rejects with an error.
     */
    async findById(userId) {
        return await User.findById(userId)
    },

    /**
     * Updates an user by their ID.
     * @async
     * @function
     * @memberof userService
     * @param {string} userId - The ID of the user to update.
     * @returns {Promise<Object>} A promise that resolves to the updated user object, or rejects with an error.
     */
    async updateById(userId, user) {
        return await User.updateById(userId, user)
    },

    /**
     * Deletes an user by their ID.
     * @async
     * @function
     * @memberof userService
     * @param {string} userId - The ID of the user to delete.
     * @returns {Promise<void>} A promise that resolves if the user was deleted, or rejects with an error.
     */
    async deleteById(userId) {
        return await User.deleteById(userId)
    },

    /**
     * Creates a new user.
     * @async
     * @function
     * @memberof userService
     * @param {Object} user - The user object to create.
     * @returns {Promise<Object>} A promise that resolves to the created user object, or rejects with an error.
     */
    async create(user) {
        const token = await genereteRandomBytes(20, 'hex')

        const userInfo = {
            ...user,
            activity: null,
            password: null,
            passwordSetupToken: token,
            passwordSetupUsed: false,
        }

        const newUser = new User(userInfo)

        try {
            await newUser.validate()
        } catch (error) {
            throw new AppError({
                code: 400,
                success: false,
                message: error.message,
            })
        }

        const savedUser = await newUser.save()

        const setupLink = `${process.env.FRONT_END_APP_URL}/setup-password/${savedUser._id}/${savedUser.passwordSetupToken}`

        await Email.enqueueEmail({
            email: newUser.email,
            subject: 'Set Up Your Account Password',
            body: `<p>Please set up your password by clicking <a href="${setupLink}">here</a>.</p>`,
        })

        return newUser
    },

    /**
     * Verifies the password setup token for a user.
     * @async
     * @function
     * @memberof userService
     * @param {string} token - The token used for password setup.
     * @returns {Promise<Object>} A promise that resolves to the user object if the token is valid and has not expired, or rejects with an error if the token is invalid or has expired.
     */
    async verifyPasswordSetupToken(userId, token) {
        const user = await User.findOne({
            _id: userId,
            passwordSetupUsed: false,
            passwordSetupToken: token,
        })

        if (!user) {
            throw new AppError({
                code: 400,
                success: false,
                message: 'Token is invalid or has expired.',
            })
        }

        return user
    },

    /**
     * Updates the password for a user.
     * @async
     * @function
     * @memberof userService
     * @param {string} userId - The ID of the user whose password needs to be updated.
     * @param {string} newPassword - The new password for the user.
     * @returns {Promise<Object>} A promise that resolves to the updated user object, or rejects with an error if the user is not found.
     */
    async setPassword({ userId, password, token }) {
        const user = await this.verifyPasswordSetupToken(userId, token)

        if (!user) {
            throw new AppError({
                code: 404,
                success: false,
                message: 'User not found.',
            })
        }

        user.password = await hashPassword(password)
        user.passwordSetupToken = undefined
        user.passwordSetupUsed = true

        await user.save()

        return user
    },
})

export default userService
