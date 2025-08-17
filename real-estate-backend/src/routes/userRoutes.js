import express from 'express'
import { userController } from '../controllers/index.js'
import { checkAuthentication } from '../middlewares/checkAuthentication.js'
import {
    checkAgentAuthorization,
    checkAuthorization,
} from '../middlewares/checkAuthorization.js'
import { checkResourceExistMiddleware } from '../middlewares/validatedResourceParams.js'
import { User } from '../models/index.js'
import {
    emailQueueService as emailService,
    userService,
} from '../services/index.js'

const router = express.Router()
const service = userService(User, emailService)
const user = userController(service)

//users route
router
    .route('')
    .get(checkAuthentication, checkAuthorization, user.getAll)
    .post(checkAuthentication, checkAuthorization, user.create)

//router.post('/verify/:token', user.verifySetupToken)
router.post('/setup-password', user.setPassword)

router
    .route('/:userId')
    .get(user.getById)
    .patch(checkAuthentication, checkAgentAuthorization(true), user.updateById)
    .delete(checkAuthentication, checkAuthorization, user.deleteById)

router.param('userId', checkResourceExistMiddleware(service, 'userId'))

export default router
