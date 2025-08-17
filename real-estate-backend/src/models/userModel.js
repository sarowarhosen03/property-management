import mongoose from 'mongoose'
import { userSchema } from '../schemas/userSchema.js'

userSchema.statics = {
    /**
     * Creates a new user.
     * @async
     * @function
     * @memberof User
     * @param {Object} newUser - The new user object to be created.
     * @returns {Promise<Object>} A promise that resolves to the created user object.
     */
    async create(newUser) {
        const user = await this(newUser)
        user.save()
        return user._doc
    },

    /**
     * Retrieves all users.
     * @async
     * @function
     * @memberof User
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
     */
    async getAll() {
        return await this.find()
            .populate('branchId', 'name')
            .populate('activity')
            .select('-password')
            .lean()
    },

    /**
     * Retrieves an user by their id.
     * @async
     * @function
     * @memberof User
     * @param {Number} userId - The id of the user to retrieve.
     * @returns {Promise<Object>} A promise that resolves to the user object.
     */
    async getById(userId) {
        return await this.findById(userId)
            .populate('branchId', 'name')
            .select('-password')
            .lean()
    },

    /**
     * Deletes an user by their id.
     * @async
     * @function
     * @memberof User
     * @param {Number} userId - The id of the user to delete.
     * @returns {Promise<Object>} A promise that resolves to the deleted user object.
     */
    async deleteById(userId) {
        return await this.findByIdAndDelete(userId)
    },

    /**
     * Updates an user by their id.
     * @async
     * @function
     * @memberof User
     * @param {Number} userId - The id of the user to update.
     * @param {Object} user - The updated user object.
     * @returns {Promise<Object>} A promise that resolves to the updated user object.
     */
    async updateById(userId, user) {
        const { passowrd, ...userInfo } = user
        return await this.findByIdAndUpdate(userId, userInfo, { new: true })
    },

    /**
     * @async
     * @function
     * @memberof User
     * @param {Object} keyValue - The object key which identifies the user
     * @returns {Promise<Object>} - A promise that resolves to the the updated user object
     */
    async getByKey(keyValue) {
        return await this.findOne(keyValue)
    },
}

const User = mongoose.model('User', userSchema)

export default User
