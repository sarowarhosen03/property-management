import { ApiFeatures } from '../utils/ApiFeatures.js'
import { AppError } from '../utils/AppError.js'
import { isAdmin, isResourceOwner } from '../utils/accessControl.js'

/**
 * Checks if the user has the necessary permissions to perform the requested action.
 * @param {Object} params - The parameters for the permission check.
 * @param {number} params.userId - The ID of the user performing the action.
 * @param {string} params.role - The role of the logged-in user.
 * @param {number} params.resourceId - The ID of the resource being accessed.
 * @param {string} params.resourceName - The type of the resource being accessed.
 * @param {string} params.action - The action being performed (e.g., 'update', 'delete').
 * @throws {AppError} - If the user does not have the necessary permissions
 * @returns {Promise<void>} - A promise that resolves if the user has permission, or rejects with an error.
 */

const propertyService = (Property) => ({
    /**
     * Retrieves all properties.
     * @async
     * @function
     * @param {Property} property
     * @memberof propertyService
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
     */

    async getAll(queryParams) {
        const features = new ApiFeatures(Property.getAll(), queryParams)
            .filter()
            .limitFields()
            .paginate()
            .sort()

        const { total, page, nextPage, prevPage, totalPages } =
            await features.paginationMetadata()
        const properties = await features.query

        return {
            properties,
            total,
            pagination: {
                currentPage: page,
                nextPage,
                prevPage,
                totalPages,
            },
        }
    },

    /**
     * Retrieves an property by the ID.
     * @async
     * @function
     * @memberof propertyService
     * @param {string} propertyId - The ID of the property to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an property object if found, or rejects with an error.
     */
    async getById(propertyId) {
        return await Property.getById(propertyId)
    },

    /**
     * Retrieves an property by the ID.
     * @async
     * @function
     * @memberof propertyService
     * @param {string} propertyId - The ID of the property to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an property object if found, or rejects with an error.
     */
    async viewById(propertyId) {
        return await Property.viewById(propertyId)
    },

    /**
     * Retrieves an property by the ID.
     * @async
     * @function
     * @memberof propertyService
     * @param {string} propertyId - The ID of the property to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an property object if found, or rejects with an error.
     */
    async findById(propertyId) {
        return await Property.findById(propertyId).lean()
    },

    /**
     * Updates a property by its ID, ensuring the user has the necessary permissions.
     * @param {Object} params - The parameters for the update operation.
     * @param {number} params.propertyId - The ID of the property to be updated.
     * @param {Object} params.property - The updated property data.
     * @param {Object} params.user - The user performing the update operation.
     * @returns {Promise<Object>} - The updated property.
     */
    async updateById({ propertyId, property: propertyDetails, user }) {
        const { id: loggedInUserId, role } = user
        const property = await this.findById(propertyId)
        const { _id: currentPropertyId, agentId } = property
        const { _id: newPropertyId = '' } = propertyDetails

        if (!isAdmin(role)) {
            if (!isResourceOwner(loggedInUserId, agentId)) {
                throw new AppError({
                    code: 401,
                    success: false,
                    message: `You're not authorized to update this resource`,
                })
            }
        }

        const isPropertyIdChanged =
            newPropertyId && currentPropertyId !== newPropertyId

        if (isPropertyIdChanged) {
            const newProperty = await this.create({
                ...property,
                ...propertyDetails,
                agentId,
            })
            await Property.deleteOne({ _id: propertyId })
            return newProperty
        }

        return await Property.updateById(propertyId, propertyDetails)
    },

    /**
     * Deletes a property by its ID, ensuring the user has the necessary permissions.
     * @async
     * @function
     * @memberof Property
     * @param {Object} params - The parameters for the delete operation.
     * @param {string} params.propertyId - The ID of the property to be deleted.
     * @param {Object} params.user - The user performing the delete operation.
     * @returns {Promise<Object>} - A promise that resolves if the property was deleted, or rejects with an error.
     */
    async deleteById({ propertyId, user }) {
        const { id: loggedUserId, role } = user
        const { agentId: agent } = await this.getById(propertyId)
        const { _id: agentId } = agent || {}

        if (isAdmin(role)) {
            return await Property.deleteById(propertyId)
        }

        if (!isResourceOwner(loggedUserId, agentId)) {
            throw new AppError({
                code: 401,
                success: false,
                message: `You're not authorized to delete this resource`,
            })
        }

        return await Property.deleteById(propertyId)
    },

    /**
     * Creates a new property.
     * @async
     * @function
     * @memberof properyService
     * @param {Object} property - The property object to create.
     * @returns {Promise<Object>} A promise that resolves to the created property object, or rejects with an error.
     */
    async create(newProperty) {
        const property = new Property(newProperty)

        try {
            await property.validate()
        } catch (error) {
            throw new AppError({
                code: 400,
                success: false,
                message: error.message,
            })
        }

        const savedProperty = await property.save()

        return savedProperty._doc
    },

    /**
     * like an property by the id
     * @async
     * @function - like
     * @memberof - propertyService
     * @param {number} - propertyId
     * @param {string} - actionType like | dislike
     * @returns {Promise<Object>}
     */
    async like(propertyId, actionType) {
        const amount = actionType === 'like' ? 1 : -1
        return await Property.like(propertyId, amount)
    },

    /**
     * share an property by the id
     * @async
     * @function - share
     * @memberof - propertyService
     * @param {number} - propertyId
     * @param {string} - actionType share
     * @returns {Promise<Object>}
     */

    async share(propertyId) {
        return await Property.share(propertyId)
    },

    /**
     * duplicate a property by the id
     * @async
     * @function - duplicateById
     * @memberof - propertyService
     * @param {number} - propertyId
     * @returns {Promise<Object>}
     */

    async duplicateById(propertyId, images, propertyNewId) {
        const property = await Property.getById(propertyId)
        const { _id, agentId, createdAt, updatedAt, ...propertyInfo } = property

        const duplicatedProperty = await this.create({
            ...propertyInfo,
            images: images || propertyInfo.images,
            agentId: agentId._id || agentId,
            isDuplicate: true,
            _id: propertyNewId,
        })

        return duplicatedProperty
    },
    /**
     * Retrieves the maximum and minimum property prices.
     *
     * @returns {Promise<Object>} A promise that resolves to an object containing the maximum and minimum prices.
     */
    async getMaxMinPrices() {
        return await Property.getMaxMinPrices()
    },
})

export default propertyService
