import express from 'express'
import { branchController } from '../controllers/index.js'
import { checkAuthentication } from '../middlewares/checkAuthentication.js'
import { checkAuthorization } from '../middlewares/checkAuthorization.js'
import { checkResourceExistMiddleware } from '../middlewares/validatedResourceParams.js'
import { Branch } from '../models/index.js'
import { branchService } from '../services/index.js'

const router = express.Router()
const service = branchService(Branch)
const branch = branchController(service)

router
    .route('')
    .get(checkAuthentication, checkAuthorization, branch.getAll)
    .post(checkAuthentication, checkAuthorization, branch.create)

router
    .route('/:branchId')
    .get(branch.getById)
    .patch(checkAuthentication, checkAuthorization, branch.updateById)
    .delete(checkAuthentication, checkAuthorization, branch.deleteById)

router.param('branchId', checkResourceExistMiddleware(service, 'branchId'))

export default router
