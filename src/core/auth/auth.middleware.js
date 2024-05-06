import jwt from 'jsonwebtoken'

import { JWT_SECRET_KEY } from '../../app/app.config.js'
import { ForbiddenError, UnauthorizedError } from '../../utils/httpError.js'
import { possess } from './auth.service.js'

/**
 * 权限守卫
 */
export const authGuard = (request, response, next) => {
  console.log(request.user)
  // 用户登录成功后会在request对象中挂在用户信息
  if (request.user.id) {
    next()
  } else {
    next(new UnauthorizedError())
  }
}

/**
 * 当前用户
 */
export const currentUser = async (request, response, next) => {
  let user = { id: null, name: 'anonymous', phone: '' }
  try {
    const authorization = request.header('Authorization')
    const token = authorization.replace('Bearer ', '')
    if (token) {
      const decoded = await jwt.verify(token, JWT_SECRET_KEY)
      user = decoded
    }
  } catch (error) {
    console.log('⚓', error.message)
  } finally {
    request.user = user
    next()
  }
}
/**
 * 访问控制
 * @param {boolean} [possession]
 * @returns
 */

export const accessControl = async (request, response, next) => {
  console.log('👮‍♀️ 访问控制')
  const { id: userId } = request.user
  // 放行管理员
  if (userId == 1) return next()

  // 准备资源
  const resourceIdParam = Object.keys(request.params)[0]
  const resourceTable = resourceIdParam.replace('Id', '')
  const resourceId = parseInt(request.params[resourceIdParam], 10)
  console.log(resourceIdParam,resourceId,resourceTable);

  try {
    const ownResource = await possess(resourceTable, resourceId, userId );

    if (!ownResource) {
      return next(new ForbiddenError());
    }
  } catch (error) {
    return next(error);
  }
  next()
}
