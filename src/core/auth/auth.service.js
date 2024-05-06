

import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../../app/app.config.js'

const prisma = new PrismaClient()
/**
 * 签发令牌
 * @param {*} options
 * @returns
 */
export const signToken = (options) => {
  const { payload } = options
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN })
  return token
}

/**
 * 检查用户是否拥有指定资源
 * @param {string} resourceTable
 * @param {number} resourceId
 * @param {number} userId
 * @returns
 */
export const possess = async (resourceTable, resourceId, userId) => {
  const count = await prisma[resourceTable].count({
    where: {
      id: resourceId,
      userId,
    },
  })
  return !!count
}
