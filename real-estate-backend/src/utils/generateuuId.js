import { v4 as uuidv4 } from 'uuid'

/**
 * Generate a UUID with a specified number of characters.
 * @param {number} length - The number of characters for the UUID.
 * @returns {string} - The generated UUID.
 */
export function generateUuid(length) {
    return uuidv4().replace(/-/g, '').substr(0, length)
}
