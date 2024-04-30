import { JWT_SECRET_KEY } from '../../app/app.config.js'
import { UnauthorizedError } from '../../utils/httpError.js'
import jwt from 'jsonwebtoken'
/**
 * 权限守卫
 */
export const authGuard = (request, response, next) => {
  console.log(request.user);
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
    console.log('⚓',error.message);
  } finally {
    request.user = user
    next()
  }
}
