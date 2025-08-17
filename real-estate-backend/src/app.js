import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { DBconntection } from './config/db.js'
import { globalErrorHandler } from './middlewares/checkError.js'
import Routes from './routes/index.js'
const app = express()

app.use(
    cors(),
    express.json(),
    cookieParser(),
    morgan('tiny'),
    express.static('public'),
)

app.use('/api/v1/auth', Routes.authRoutes)
app.use('/api/v1/users', Routes.userRoutes)
app.use('/api/v1/properties', Routes.propertyRoutes)
app.use('/api/v1/listings', Routes.listingRotues)
app.use('/api/v1/branches', Routes.branchRoutes)
app.use('/api/v1/contacts', Routes.contactRoutes)
app.use('/api/v1/inboxes', Routes.inboxRoutes)
app.use('/api/v1/statistics', Routes.statisticRoutes)

app.use('/api/v1/health', (_request, res) => {
    return res.status(200).json({
        code: 200,
        success: true,
        message: 'Api health is ok!',
    })
})

app.all('*', (req, res) => {
    return res.status(404).json({
        code: 404,
        success: false,
        message: `This path ${req.originalUrl} isn't on this server!`,
    })
})
app.use(globalErrorHandler)

export { DBconntection }
export default app
