import _ from 'lodash'

import {
  getUserById,
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} from './user.service.js'

import { NotFoundError } from '../../utils/httpError.js'

/**
 * 用户列表
 */
export const index = async (request, response, next) => {
  try {
    const { sort, filter, pagination } = request
    const data = await getUsers({ sort, filter, pagination })
    response.send(data)
  } catch (error) {
    next(error)
  }
}

/**
 * 创建用户
 */
export const store = async (request, response, next) => {
  const { name, password, phone } = request.body
  try {
    const data = await createUser({ name, phone, password })
    response.status(201).send(_.omit(data, ['password']))
  } catch (error) {
    next(error)
  }
}

/**
 * 用户帐户
 */
export const show = async (request, response, next) => {
  // 准备数据
  const { userId } = request.params

  // 调取用户
  try {
    const user = await getUserById(parseInt(userId, 10))

    if (!user) {
      return next(new NotFoundError('没有找到这个用户'))
    }

    // 做出响应
    response.send(_.omit(user, ['password']))
  } catch (error) {
    next(error)
  }
}

/**
 * 更新用户
 */
export const update = async (request, response, next) => {
  const { userId } = request.params
  const user = _.pick(request.body, ['name'])
  try {
    const data = await updateUser(parseInt(userId, 10), user)
    response.send(_.omit(data, ['password']))
  } catch (error) {
    next(error)
  }
}

/**
 * 删除
 */
export const destroy = async (request, response, next) => {
  const { userId } = request.params
  console.log(userId)
  try {
    const data = await deleteUser(parseInt(userId, 10))
    console.log(data)
    response.status(201).send(_.omit(data, ['password']))
  } catch (error) {
    console.log(error)
    next(error)
  }
}
