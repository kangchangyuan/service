import bcrypt from 'bcryptjs'

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
      name: {
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

/**
 * HASH 密码
 */
export const hashPassword = async (
  request,
  response,
  next,
) => {
  // 准备数据
  const { password } = request.body;

  // HASH 密码
  request.body.password = await bcrypt.hash(password, 10);

  // 下一步
  next();
};