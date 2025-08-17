import mongoose from 'mongoose'
import { propertySchema } from '../schemas/propertySchema.js'

propertySchema.statics = {
    /**
     * Retrieves all properties.
     * @async
     * @function
     * @memberof Property
     * @param {Object} query - the query filter parameters
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of property objects.
     */
    getAll() {
        return this.find().lean()
    },

    /**
     * Retrieves an property by the id.
     * @async
     * @function
     * @memberof Property
     * @param {Number} propertyId - The id of the property to retrieve.
     * @returns {Promise<Object>} A promise that resolves to the property object.
     */
    async getById(propertyId) {
        return await this.findById(propertyId)
            .populate({
                path: 'agentId',
                select: '-password -role -activity -passwordSetupUsed',
            })
            .lean()
    },

    /**
     * Retrieves an property by the id.
     * @async
     * @function
     * @memberof Property
     * @param {Number} propertyId - The id of the property to retrieve.
     * @returns {Promise<Object>} A promise that resolves to the property object.
     */
    async viewById(propertyId) {
        const property = await this.findByIdAndUpdate(propertyId, {
            $inc: {
                views: 1,
            },
        })
        return property
    },

    /**
     * Updates an property by their id.
     * @async
     * @function
     * @memberof Property
     * @param {Number} propertyId - The id of the property to update.
     * @param {Object} property - The updated property object.
     * @returns {Promise<Object>} A promise that resolves to the updated property object.
     */
    async updateById(propertyId, property) {
        const updatedProperty = await this.findByIdAndUpdate(
            propertyId,
            property,
            {
                new: true,
            },
        )
        return updatedProperty._doc
    },

    /**
     * Deletes an property by their id.
     * @async
     * @function
     * @memberof Property
     * @param {Number} propertyId - The id of the property to delete.
     * @returns {Promise<Object>} A promise that resolves to the deleted property object.
     */
    async deleteById(propertyId) {
        return await this.deleteOne({ _id: propertyId })
    },

    /**
     * Creates a new property in the database.
     * @async
     * @function
     * @memberof Property
     * @param {Object} newProperty - The new property to create.
     * @returns {Promise<Object>} A promise that resolves to the created property.
     */
    create: async function (newProperty) {
        const property = await this(newProperty)

        await property.save()
        return property._doc
    },

    /**
     * Creates a new property in the database.
     * @async
     * @function
     * @memberof Property
     * @param {Object} propertyId - The new property to create.
     * @returns {Promise<Object>} A promise that resolves to the created property.
     */
    like: async function (propertyId, amount) {
        const property = await this.findByIdAndUpdate(propertyId, {
            $inc: { likes: amount },
        })
        return property
    },

    /**
     * Creates a new property in the database.
     * @async
     * @function
     * @memberof Property
     * @param {number} propertyId - the property Id which need to updated.
     * @returns {Promise<Object>} A promise that resolves to the created property.
     */
    share: async function (propertyId) {
        const property = await this.findByIdAndUpdate(
            propertyId,
            { $inc: { shares: 1 } },
            { new: true },
        )
        return property._doc
    },

    /**
     * Retrieves the maximum and minimum prices of properties.
     * @async
     * @function
     * @returns {Promise<Object>} A promise that resolves to an object containing maxPrice and minPrice.
     */

    getMaxMinPrices: async function () {
        const result = await this.aggregate([
            {
                $group: {
                    _id: null,
                    maxPrice: { $max: '$price.amount' },
                    minPrice: { $min: '$price.amount' },
                },
            },
        ])

        if (result.length === 0) {
            return { maxPrice: null, minPrice: null }
        }

        const { maxPrice, minPrice } = result[0]
        return { maxPrice, minPrice }
    },
}

const Property = mongoose.model('Property', propertySchema)

export default Property
