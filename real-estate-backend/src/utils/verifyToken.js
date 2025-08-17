import Jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config/index.js'

/**
 * Verifies a JSON Web Token (JWT) and returns a boolean value indicating whether the token is valid or not.
 * @param {string} token - The JWT to be verified.
 * @param {function} callback - The callback function that will be called with the verification result.
 * @returns {boolean} - A boolean value indicating whether the token is valid or not.
 */
export const verifyToken = (token, callback) => {
    const isVerifiedToken = Jwt.verify(token, TOKEN_SECRET, callback)
    return isVerifiedToken
}
