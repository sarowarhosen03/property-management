import mongoose from 'mongoose'
import { branchSchema } from '../schemas/branchSchema.js'

branchSchema.statics = {
    /**
     * Retrieves all properties.
     * @async
     * @function
     * @memberof Branch
     * @param {Object} query - the query filter parameters
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of branch objects.
     */
    getAll(query) {
        return this.find(query).lean()
    },

    /**
     * Retrieves an branch by the id.
     * @async
     * @function
     * @memberof Branch
     * @param {Number} branchId - The id of the branch to retrieve.
     * @returns {Promise<Object>} A promise that resolves to the branch object.
     */
    async getById(branchId) {
        const branch = await this.findByIdAndUpdate(
            branchId,
            {
                $inc: {
                    views: 1,
                },
            },
            { new: true },
        ).lean()
        return branch
    },

    /**
     * Updates an branch by their id.
     * @async
     * @function
     * @memberof Branch
     * @param {Number} branchId - The id of the branch to update.
     * @param {Object} branch - The updated branch object.
     * @returns {Promise<Object>} A promise that resolves to the updated branch object.
     */
    async updateById(branchId, branch) {
        return await this.findByIdAndUpdate(branchId, branch, {
            new: true,
        }).lean()
    },

    /**
     * Deletes an branch by their id.
     * @async
     * @function
     * @memberof Branch
     * @param {Number} branchId - The id of the branch to delete.
     * @returns {Promise<Object>} A promise that resolves to the deleted branch object.
     */
    async deleteById(branchId) {
        return await this.deleteOne({ _id: branchId })
    },

    /**
     * Creates a new branch in the database.
     * @async
     * @function
     * @memberof Branch
     * @param {Object} newBranch - The new branch to create.
     * @returns {Promise<Object>} A promise that resolves to the created branch.
     */
    create: async function (newBranch) {
        const branch = await this(newBranch)
        await branch.save().lean()
        return branch
    },

    /**
     * Creates a new branch in the database.
     * @async
     * @function
     * @memberof Branch
     * @param {Object} branchId - The new branch to create.
     * @returns {Promise<Object>} A promise that resolves to the created branch.
     */
}

const Branch = mongoose.model('Branch', branchSchema)

export default Branch
