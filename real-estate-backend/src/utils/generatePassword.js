import bcrypt from 'bcrypt'

const SALT_ROUND = 10
/**
 * Generate a salt value with the specified number of rounds.
 * @param {number} rounds - The number of rounds to use for generating the salt.
 * @returns {Promise<string>} A promise that resolves to the generated salt.
 */
async function genSalt(rounds) {
    return await bcrypt.genSalt(rounds)
}

/**
 * Hash the specified password with the specified salt.
 * @param {string} password - The password to hash.
 * @param {string} salt - The salt to use for hashing the password.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
async function hash(password, salt) {
    return await bcrypt.hash(password, salt)
}

/**
 * Generate a salt value and hash the specified password with the generated salt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
async function hashPassword(password) {
    const salt = await genSalt(SALT_ROUND)
    const generatedPassword = await hash(password, salt)
    return generatedPassword
}

/**
 * Compares two passwords using the bcrypt algorithm.
 * @param {string} plainPassword - The plain text password to compare.
 * @param {string} hashPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating
 * whether the passwords match or not.
 */
async function comparePassword(plainPassword, hashPassword) {
    return await bcrypt.compare(plainPassword, hashPassword)
}

export { comparePassword, genSalt, hash, hashPassword }
