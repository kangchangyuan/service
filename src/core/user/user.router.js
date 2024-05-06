import express from 'express'

import * as userController from './user.controller.js'
import { filter, hashPassword, paginate, sort } from './user.middleware.js'
import { validationRequest } from '../../app/app.middleware.js'
import { createUserSchema } from './user.validate.js'
import { accessControl, authGuard } from '../auth/auth.middleware.js'

const router = express.Router()

/**
 * 用户列表
 */

router.get('/users', authGuard, sort, filter, paginate, userController.index)

/**
 * 创建用户
 */
router.post(
  '/users',
  authGuard,
  validationRequest(createUserSchema),
  hashPassword,
  userController.store
)

/**
 * 用户帐户
 */
router.get('/users/:userId', authGuard, userController.show)

/**
 * 更新用户
 */
router.patch('/users/:userId', authGuard, userController.update)
/**
 * 删除用户
 */
router.delete('/users/:userId', authGuard, userController.destroy)

export default router
