import _ from 'lodash'

import {createFile, deleteFile, getFileById, getFiles,} from './file.service.js'

import { NotFoundError } from '../../utils/httpError.js'

/**
 * 文件列表
 */
export const index = async (request, response, next) => {
  try {
    const { sort, filter, pagination } = request
    const data = await getFiles({ sort, filter, pagination })
    response.send(data)
  } catch (error) {
    next(error)
  }
}

/**
 * 上传文件
 */
export const store = async (request, response, next) => {
  console.log(request.file);
  const { path, originalname, mimetype,size } = request.file
  const {id:userId} = request.user
  try {
    const data = await createFile({ path, originalname, mimetype,size,userId})
    response.status(201).send(data)
  } catch (error) {
    next(error)
  }
}

/**
 * 文件信息
 */
export const show = async (request, response, next) => {

  const { fileId } = request.params

  try {
    const data = await getFileById(parseInt(fileId, 10))

    if (!data) {
      return next(new NotFoundError('没有找到这个文件'))
    }

    // 做出响应
    response.send(data)
  } catch (error) {
    next(error)
  }
}


/**
 * 删除file
 */
export const destroy = async (request, response, next) => {
  const { fileId } = request.params

  try {
    const data = await deleteFile(parseInt(fileId, 10))
    response.send(data);
  } catch (error) {
    next(error)
  }
}
