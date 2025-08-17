import mongoose from 'mongoose'

/**
 * Checks if the provided ID is a valid MongoDB ObjectID.
 * @param {string} id - The ID to check for validity.
 * @returns {boolean} - Returns true if the ID is a valid MongoDB ObjectID, otherwise false.
 */

export const checkIsValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}

/**
 * Checks if the provided ID is a valid MongoDB ObjectID.
 * @param {string} id - The ID to check for validity.
 * @returns {boolean} - Returns true if the ID is a valid MongoDB ObjectID, otherwise false.
 */
export const checkIsValidUUId = (id) => {
    return id.length >= 8
}
