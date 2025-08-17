import express from 'express'
import { authController } from '../controllers/index.js'
import { checkAuthentication } from '../middlewares/checkAuthentication.js'
import {
    LoginActivity as LoginActivityModel,
    ResetPassword,
    User,
} from '../models/index.js'
import {
    authService,
    emailService,
    loginActivityService,
} from '../services/index.js'

const router = express.Router()
const loginActivity = loginActivityService(LoginActivityModel)
const services = authService(User, ResetPassword, emailService, loginActivity)
const auth = authController(services)

router.post('/login', auth.login)
router.post('/forgot-password', auth.requestForgotPassword)
router.post('/forgot-password/:userId/:token', auth.updateForogtPassword)
router.post('/reset-password', checkAuthentication, auth.requestResetPassword)

export default router
