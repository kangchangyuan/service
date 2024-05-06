import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * 获取用户列表
 */
export const getUsers = async (options) => {
  const {
    sort,
    filter,
    pagination: { limit, offset },
  } = options
  const data = await prisma.user.findMany({
    skip: offset,
    take: limit,
    where: {
      ...filter,
    },
    select: {
      id: true,
      phone: true,
      name: true,
    },
    orderBy: sort,
  })
  const count = await prisma.user.count({where:{
    ...filter
  }})
  return { count, data }
}

/**
 * @typedef UserDto
 * @type {object}
 * @property {string} [name] - 用户名
 * @property {string} password - 密码
 * @property {string} phone - 手机号
 */
/**
 *
 * @param {UserDto} user
 * @returns
 */
export const createUser = async (user) => {
  return await prisma.user.create({ data: user })
}

/**
 * 按用手机号获取用户
 */
export const getUserByPhone = async (userPhone) => {
  return await prisma.user.findFirst({ where: { phone: userPhone } })
}

/**
 * 按用户 ID 获取用户
 */
export const getUserById = async (userId) => {
  return await prisma.user.findFirst({ where: { id: userId } })
}

/**
 * 更新用户信息
 */
export const updateUser = async (userId,user) => {
  return await prisma.user.update({
    where:{
      id:userId
    },
    data:user
  })
}
/**
 * 删除用户信息
 */
export const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where:{
      id:userId
    },
  })
}
