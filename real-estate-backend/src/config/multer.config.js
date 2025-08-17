import fs from 'fs'
import multer from 'multer'

const ensureFolderExists = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true })
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = 'public/'
        switch (true) {
            case req.baseUrl.includes('branches'):
                folder = 'public/branches'
                break
            case req.baseUrl.includes('properties'):
                folder = 'public/properties'
                break
            case req.baseUrl.includes('users'):
                folder = 'public/avatars'
                break
            default:
                folder = 'public/'
                break
        }

        ensureFolderExists(folder)
        cb(null, folder)
    },
    filename: (req, file, cb) => {
        const uniqueFileSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9)
        const originalFilename = file.originalname.replace(/\s+/g, '-')
        cb(null, `${uniqueFileSuffix}-${originalFilename}`)
    },
})

const upload = multer({ storage })

export default upload
