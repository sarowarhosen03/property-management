import mongoose from 'mongoose'
import { inboxSchema } from '../schemas/inboxSchema.js'

inboxSchema.statics = {
    /**
     * Retrieves all properties.
     * @async
     * @function
     * @memberof Inbox
     * @param {Object} query - the query filter parameters
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of inbox objects.
     */
    getAll(query) {
        return this.find(query).lean()
    },

    /**
     * Retrieves an inbox by the id.
     * @async
     * @function
     * @memberof Inbox
     * @param {Number} inboxId - The id of the inbox to retrieve.
     * @returns {Promise<Object>} A promise that resolves to the inbox object.
     */
    async getById(inboxId) {
        const inbox = await this.findByIdAndUpdate(inboxId).lean()
        return inbox
    },

    /**
     * Updates an inbox by their id.
     * @async
     * @function
     * @memberof Inbox
     * @param {Number} inboxId - The id of the inbox to update.
     * @param {Object} inbox - The updated inbox object.
     * @returns {Promise<Object>} A promise that resolves to the updated inbox object.
     */
    async updateById(inboxId, inbox) {
        return await this.findByIdAndUpdate(inboxId, inbox, {
            new: true,
        }).lean()
    },

    /**
     * Deletes an inbox by their id.
     * @async
     * @function
     * @memberof Inbox
     * @param {Number} inboxId - The id of the inbox to delete.
     * @returns {Promise<Object>} A promise that resolves to the deleted inbox object.
     */
    async deleteById(inboxId) {
        return await this.deleteOne({ _id: inboxId })
    },

    /**
     * Creates a new inbox in the database.
     * @async
     * @function
     * @memberof Inbox
     * @param {Object} newInbox - The new inbox to create.
     * @returns {Promise<Object>} A promise that resolves to the created inbox.
     */
    create: async function (newInbox) {
        const inbox = await this(newInbox)
        await inbox.save()
        return inbox._doc
    },
}

const Inbox = mongoose.model('Inbox', inboxSchema)

export default Inbox
