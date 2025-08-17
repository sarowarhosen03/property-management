import Jwt from 'jsonwebtoken'
import { TOKEN_EXPIRES_IN, TOKEN_SECRET } from '../config/index.js'

/**
 * Generate an access token for the given user.
 *
 * @param {string} _id - The user ID
 * @param {string} name - The user's full name
 * @param {string} role - The user's role
 *@param {string} - email - The user's email
 * @returns {string} The access token
 */
export const generateAccessToken = ({ id, name, role, email }) => {
    return Jwt.sign({ id, name, role, email }, TOKEN_SECRET, {
        expiresIn: TOKEN_EXPIRES_IN,
    })
}
