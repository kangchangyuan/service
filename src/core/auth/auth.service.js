
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../../app/app.config.js'
/**
 * 签发令牌
 * @param {*} options 
 * @returns 
 */
export const signToken =(options)=>{
  const { payload } = options
  const token = jwt.sign(payload,JWT_SECRET_KEY,{expiresIn:JWT_EXPIRES_IN})
  return token
}