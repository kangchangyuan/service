import multer from 'multer';
import mime from 'mime'
import fs from 'fs'

import { NotFoundError } from "../../utils/httpError.js";


/**
 * 文件过滤器
 */
export const fileFilter = (fileTypes) => {
  return (
    request,
    file,
    callback,
  ) => {
    // 测试文件类型
    const allowed = fileTypes.some(type => type === file.mimetype);

    if (allowed) {
      // 允许上传
      callback(null, true);
    } else {
      // 拒绝上传
      callback(new NotFoundError('文件类型不支持'));
    }
  };
};

const fileUploadFilter = fileFilter(['image/png', 'image/jpg', 'image/jpeg']);


/**
 * 创建一个 Multer
 */
const fileUpload = multer({
  dest: 'uploads/',
  fileFilter: fileUploadFilter,
});
/**
 * 文件拦截器
 */
export const fileInterceptor = fileUpload.single('file');

/**
 * 文件处理器
 */
export const fileProcessor = async (
  request,
  response,
  next,
) => {
  // 文件路径
  const { path,mimetype } = request.file;

  try {
    const renamePath = path+'.'+mime.getExtension(mimetype)
    // 重命名文件添加后缀名
    fs.renameSync(path,renamePath)
    request.file.path = renamePath
    
  } catch (error) {
    return next(error);
  }
  // 可以在这里进一步的调整图片的属性，如宽高，像素质量等
 
  // 下一步
  next();
};
/**
 * 排序方式
 */
export const sort = async (request, response, next) => {
  // 获取客户端的排序方式
  const { sort } = request.query

  // 排序用的 对象
  const orderBy = {}

  // 设置排序用对象
  switch (sort) {
    case 'earliest':
      orderBy.id = 'asc'
      break
    case 'latest':
      orderBy.id = 'desc'
      break
    default:
      orderBy.id = 'desc'
      break
  }

  // 在请求中添加排序
  request.sort = orderBy

  // 下一步
  next()
}
/**
 * 过滤列表
 */
export const filter = async (request, response, next) => {
  // 解构查询符
  const { name } = request.query
  // 设置默认的过滤
  request.filter = {}

  if (name) {
    request.filter = {
      originalname: {
        contains: name,
      },
    }
  }

  // 下一步
  next()
}
/**
 * 内容分页
 */
export const paginate = async (request, response, next) => {
  // 当前页码
  const { page = 1, limit = 15 } = request.query

  // 计算出偏移量
  const offset = limit * (parseInt(`${page}`, 10) - 1)

  // 设置请求中的分页
  request.pagination = { limit, offset }

  // 下一步
  next()
}
