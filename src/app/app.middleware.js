import { validationResult,checkSchema  } from 'express-validator'
import { BadRequestError } from '../utils/httpError.js'
/**
 * 提交数据验证器
 */
export const validationRequest = (schema) => {
  return async (request, response, next) => {
    console.log('👮‍♂️ 验证数据');
    await checkSchema(schema).run(request)
    // 检查验证结果
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      // 如果存在验证错误，则抛出错误
      const errorMessage = errors
        .array()
        .map((error) => error.msg)
        .join(', ')
      next(new BadRequestError(errorMessage))
    } else {
      next()
    }
  }
}

/**
 * 默认异常处理器
 */
export const defaultErrorHandler = (error, request, response, next) => {

  if (error.message) {
    console.log('🚧', error.message)
  }

  let statusCode, message

  if (!error.statusCode) {
    statusCode = 500
    message = '服务暂时出了点问题 ~~ 🌴'
  }else{
    statusCode = error.statusCode
    message = error.message
  }

  response.status(statusCode).send({ message })
}
