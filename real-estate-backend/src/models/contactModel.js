import mongoose from 'mongoose'
import { contactSchema } from '../schemas/contactSchema.js'

contactSchema.statics = {
    /**
     * Retrieves all properties.
     * @async
     * @function
     * @memberof Contact
     * @param {Object} query - the query filter parameters
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of contact objects.
     */
    getAll(query) {
        return this.find(query).lean()
    },

    /**
     * Retrieves an contact by the id.
     * @async
     * @function
     * @memberof Contact
     * @param {Number} contactId - The id of the contact to retrieve.
     * @returns {Promise<Object>} A promise that resolves to the contact object.
     */
    async getById(contactId) {
        const contact = await this.findById(contactId).lean()
        return contact
    },

    /**
     * Updates an contact by their id.
     * @async
     * @function
     * @memberof Contact
     * @param {Number} contactId - The id of the contact to update.
     * @param {Object} contactDetails - The updated contact object.
     * @returns {Promise<Object>} A promise that resolves to the updated contact object.
     */
    async updateById(contactId, contactDetails) {
        return await this.findByIdAndUpdate(contactId, contactDetails, {
            new: true,
        }).lean()
    },

    /**
     * Deletes an contact by their id.
     * @async
     * @function
     * @memberof Contact
     * @param {Number} contactId - The id of the contact to delete.
     * @returns {Promise<Object>} A promise that resolves to the deleted contact object.
     */
    async deleteById(contactId) {
        return await this.deleteOne({ _id: contactId })
    },

    /**
     * Creates a new contact in the database.
     * @async
     * @function
     * @memberof Contact
     * @param {Object} newContact - The new contact to create.
     * @returns {Promise<Object>} A promise that resolves to the created contact.
     */
    create: async function (newContact) {
        const contact = await this(newContact)
        await contact.save()
        return contact._doc
    },
}

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
