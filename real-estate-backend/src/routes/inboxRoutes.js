import express from 'express'
import { inboxController } from '../controllers/index.js'
import { checkAuthentication } from '../middlewares/checkAuthentication.js'
import { checkAgentAuthorization } from '../middlewares/checkAuthorization.js'
import { checkResourceExistMiddleware } from '../middlewares/validatedResourceParams.js'
import { Inbox, User } from '../models/index.js'
import { emailService, inboxService } from '../services/index.js'

const router = express.Router()
const service = inboxService(Inbox, User, emailService)
const inbox = inboxController(service)

router.route('').get(checkAuthentication, inbox.getAll).post(inbox.create)

router
    .route('/:inboxId')
    .get(checkAuthentication, checkAgentAuthorization(true), inbox.getById)
    .patch(checkAuthentication, checkAgentAuthorization(true), inbox.updateById)
    .delete(
        checkAuthentication,
        checkAgentAuthorization(true),
        inbox.deleteById,
    )

router.param('inboxId', checkResourceExistMiddleware(service, 'inboxId'))

export default router
