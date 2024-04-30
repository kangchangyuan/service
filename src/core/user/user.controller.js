import { NotFoundError } from '../../utils/httpError.js'
import * as userService from './user.service.js'
import _ from 'lodash'
/**
 * 用户列表
 */
export const index = async (request, response, next) => {
  try {
    const { sort, filter, pagination } = request
    const data = await userService.getUsers({ sort, filter, pagination })
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
    const data = await userService.createUser({ name, phone, password })
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
    const user = await userService.getUserById(parseInt(userId, 10))

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
  const user = _.pick(request.body,['name'])
  try {
    const data = await userService.updateUser(parseInt(userId, 10), user)
    response.send(_.omit(data,['password']));
  } catch (error) {
    next(error)
  }
}
