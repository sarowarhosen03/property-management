import express from 'express'
import { propertyController } from '../controllers/index.js'
import { checkAuthentication } from '../middlewares/checkAuthentication.js'
import { checkAgentAuthorization } from '../middlewares/checkAuthorization.js'
import { checkResourceExistMiddleware } from '../middlewares/validatedResourceParams.js'
import { Property } from '../models/index.js'
import { propertyService } from '../services/index.js'

const router = express.Router()
const service = propertyService(Property)
const property = propertyController(service)

//users route
router.route('').get(property.getAll).post(checkAuthentication, property.create)

router.get('/prices', property.getPropertyPrices)

router
    .route('/:propertyId')
    .get(property.getById)
    .patch(checkAuthentication, property.updateById)
    .delete(
        checkAuthentication,
        checkAgentAuthorization(true),
        property.deleteById,
    )

router.post('/:propertyId/likes', property.like)
router.post('/:propertyId/views', property.view)
router.post('/:propertyId/shares', property.share)
router.post(
    '/:propertyId/duplicate',
    checkAuthentication,
    property.duplicateById,
)

router.param(
    'propertyId',
    checkResourceExistMiddleware(service, 'propertyId', true),
)

export default router
