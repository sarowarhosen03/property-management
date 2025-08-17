import mongoose from 'mongoose'
import { listingSchema } from '../schemas/listingSchema.js'

listingSchema.statics = {
    /**
     * Creates a new property in the database.
     * @async
     * @function
     * @memberof Listing
     * @param {Object} newProperty - The new property to create.
     * @returns {Promise<Object>} A promise that resolves to the created property.
     */
    async getAll() {
        return await this.find()
    },
}

const Listing = mongoose.model('Listing', listingSchema)

export default Listing
