import { AppError } from '../utils/AppError.js'
import { verifyToken } from '../utils/verifyToken.js'

export const checkAuthentication = (req, _res, next) => {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
        return next(
            new AppError({
                code: 401,
                success: false,
                message: 'Unauthenticated request!',
            }),
        )
    }

    const token = authorizationHeader.split(' ')[1]

    if (!token) {
        return next(
            new AppError({
                code: 403,
                success: false,
                message: 'Forbidden: Token not found!',
            }),
        )
    }

    verifyToken(token, (err, decodedToken) => {
        if (err) {
            return next(
                new AppError({
                    code: 403,
                    success: false,
                    message: 'Forbidden: Invalid token',
                }),
            )
        }

        const { id, name, role } = decodedToken
        req.user = {
            id,
            name,
            role,
        }
        next()
    })
}
