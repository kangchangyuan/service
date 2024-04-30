import dotenv from 'dotenv';

dotenv.config();

/**
 * 应用配置
 */

export const {APP_PORT} = process.env;

/**
 * CORS
 */
export const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN;

/**
 * JWT
 */
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

