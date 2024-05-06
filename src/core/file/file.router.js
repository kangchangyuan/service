import express from 'express'

import * as fileController from './file.controller.js'
import { filter, paginate, sort,fileInterceptor,fileProcessor } from './file.middleware.js'

import { accessControl, authGuard } from '../auth/auth.middleware.js'

const router = express.Router()

/**
 * 文件列表
 */

router.get('/files', authGuard, sort, filter, paginate, fileController.index)

/**
 * 上传文件
 */
router.post(
  '/files',
  authGuard,
  fileInterceptor,
  fileProcessor,
  fileController.store
)

/**
 * 文件信息
 */
router.get('/files/:fileId', authGuard, fileController.show)

/**
 * 删除文件
 */
router.delete('/files/:fileId', authGuard,accessControl, fileController.destroy)

export default router
