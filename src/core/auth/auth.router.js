import express from 'express'
import { validationRequest } from '../../app/app.middleware.js'
import { loginSchema } from './auth.validate.js'
import * as authController from './auth.controller.js'
// import * as userController from './user.controller.js'
// import { filter, paginate, sort } from './user.middleware.js'

const router = express.Router()

/**
 * 登录
 */

router.post('/auth/login',validationRequest(loginSchema), authController.login)



export default router