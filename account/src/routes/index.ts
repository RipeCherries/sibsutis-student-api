import express from 'express';
import groupRouter from './groupRouter';
import swaggerRouter from './swaggerRouter';
import userRouter from './userRouter';

const router: express.Router = express.Router();

router.use('/', userRouter);
router.use('/', groupRouter);
router.use('/', swaggerRouter);

export default router;
