import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * 获取文件列表
 */
export const getFiles = async (options) => {
  const {
    sort,
    filter,
    pagination: { limit, offset },
  } = options
  const data = await prisma.file.findMany({
    skip: offset,
    take: limit,
    where: {
      ...filter,
    },
    orderBy: sort,
  })
  const count = await prisma.user.count({where:{
    ...filter
  }})
  return { count, data }
}

/**
 * @typedef File
 * @type {object}
 * @property {string} path - 路径
 * @property {string} originalname - 原始文件名
 * @property {number} size - 文件大小
 * @property {string} mimetype - 文件类型
 * @property {number} userId - 用户id
 */
/**
 * 上传文件
 * @param {File} file
 * @returns
 */
export const createFile = async (file) => {
  return await prisma.file.create({ data: file })
}



/**
 * 按 ID 获取文件
 */
export const getFileById = async (fileId) => {
  return await prisma.file.findFirst({ where: { id: fileId } })
}


/**
 * 删除文件信息
 */
export const deleteFile = async (fileId) => {
  return await prisma.file.delete({
    where:{
      id:fileId
    },
  })
}
