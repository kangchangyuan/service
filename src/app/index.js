
import express from 'express';
import cors from 'cors';

import userRouter from '../core/user/user.router.js';
import authRouter from '../core/auth/auth.router.js';
import fileRouter from '../core/file/file.router.js';

import appRouter from './app.router.js';
import { defaultErrorHandler } from './app.middleware.js';

import { ALLOW_ORIGIN } from './app.config.js';
import { currentUser } from '../core/auth/auth.middleware.js';


/**
 * 创建应用
 */
const app = express();

/**
 * 处理 JSON
 */
app.use(express.json());

/**
 * 当前用户
 */
app.use(currentUser);

/**
 * 跨域资源共享
 */
app.use(
  cors({
    origin: ALLOW_ORIGIN
  }),
);

/**
 * 路由
 */
app.use(
  userRouter,
  authRouter,
  fileRouter,
  appRouter,
);

/**
 * 默认异常处理器
 */
app.use(defaultErrorHandler);

/**
 * 导出应用
 */
export default app;