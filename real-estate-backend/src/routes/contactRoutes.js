import express from 'express'
import { contactController } from '../controllers/index.js'
import { checkAuthentication } from '../middlewares/checkAuthentication.js'
import { checkResourceExistMiddleware } from '../middlewares/validatedResourceParams.js'
import { Contact } from '../models/index.js'
import { contactService, emailService } from '../services/index.js'

const router = express.Router()
const service = contactService(Contact, emailService)
const contact = contactController(service)

router.route('').get(checkAuthentication, contact.getAll).post(contact.create)

router
    .route('/:contactId')
    .get(checkAuthentication, contact.getById)
    .patch(checkAuthentication, contact.updateById)
    .delete(checkAuthentication, contact.deleteById)

router.param('contactId', checkResourceExistMiddleware(service, 'contactId'))

export default router
