import express from 'express';

const router = express.Router();

router.get('/', (request, response) => {
  response.send({ title: 'KANGCHANGYUAN' });
});

/**
 * 导出路由
 */
export default router;