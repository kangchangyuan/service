import { customPhoneValidator } from "../../utils/validator.js";

export const loginSchema={
  phone:{
    in:['body'],
    custom: {
      options: customPhoneValidator
    }
  },
  password: {
    in: ['body'],
    isLength: {
        options: { min: 6 },
        errorMessage: '密码长度最小6位'
    }
}
}