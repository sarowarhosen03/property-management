const handleFileUpload = (isMultiple = false) => {
    return async (req, res, next) => {
        try {
            if (!req.file) {
                return next()
            }

            if (!isMultiple) {
                const fileUrl = `${req.protocol}://${req.get(
                    'host',
                )}/public/${req.file.destination.split('/').slice(-1)}/${
                    req.file.filename
                }`
                req.body.image = fileUrl
                return next()
            }

            if (req.files.length > 0) {
                req.body.files = req.files.map((file) => {
                    const fileUrl = `${req.protocol}://${req.get(
                        'host',
                    )}/public/${file.destination.split('/').slice(-1)}/${
                        file.filename
                    }`
                    return {
                        url: fileUrl,
                        originalName: file.originalname,
                        filename: file.filename,
                    }
                })
            }
            next()
        } catch (error) {
            const files = isMultiple ? req.files : req.file ? [req.file] : []
            files.forEach((file) => {
                const filePath = path.join(file.destination, file.filename)
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete file: ${filePath}`, err)
                    }
                })
            })

            const { message, code } = error

            next(
                new AppError({
                    code,
                    success: false,
                    message,
                }),
            )
        }
    }
}

export default handleFileUpload
