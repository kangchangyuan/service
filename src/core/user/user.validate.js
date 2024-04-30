import { customPhoneValidator } from '../../utils/validator.js'

export const createUserSchema = {
  phone: {
    in: ['body'],
    custom: {
      options: customPhoneValidator,
    },
  },
  password: {
    in: ['body'],
    isLength: {
      options: { min: 6 },
      errorMessage: '密码长度最小6位',
    },
  },
  name: {
    in: ['body'],
    isString:true,
    // 可选标识，为null是不触发isString规则
    optional:true
  }
}
