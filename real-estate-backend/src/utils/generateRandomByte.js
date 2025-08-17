import crypto from 'crypto'

export const genereteRandomBytes = (keyCount, type) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(keyCount, (err, key) => {
            if (err) {
                reject(err)
            }
            resolve(key.toString(type))
        })
    })
}
