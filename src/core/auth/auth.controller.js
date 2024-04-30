import { BadRequestError } from '../../utils/httpError.js'
import { getUserByPhone } from '../user/user.service.js'
import { signToken } from './auth.service.js'
import bcrypt from 'bcryptjs'
import _ from 'lodash'

/**
 * 登录
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
export const login = async (request, response, next) => {
  const { phone, password } = request.body
  try {
    // 验证手机号
    const user = await getUserByPhone(phone)
    if (!user) return next(new BadRequestError(`没有找到${phone}相关用户`))

    // 验证密码
    const matched = await bcrypt.compare(password, user.password)
    if (!matched) return next(new BadRequestError(`密码不正确，请重试！`))

    // 生成token
    const payload = _.pick(user, ['id', 'name', 'phone'])
    const token = signToken({ payload })

    response.send({ token, ...payload })
  } catch (error) {
    next(error)
  }
}
