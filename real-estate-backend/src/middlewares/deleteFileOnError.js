import fs from 'fs'
import path from 'path'

const deleteFileOnError = (req, res, next) => {
    res.on('finish', () => {
        if (res.statusCode >= 400 && req.file) {
            const filePath = path.join(req.file.destination, req.file.filename)
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Failed to delete file: ${filePath}`, err)
                } else {
                    console.log(`Deleted file: ${filePath}`)
                }
            })
        }
    })
    next()
}

export default deleteFileOnError
