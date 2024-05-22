import express from 'express';
import lessonRouter from './lessonRouter';
import swaggerRouter from './swaggerRouter';

const router: express.Router = express.Router();

router.use('/', lessonRouter);
router.use('/', swaggerRouter);

export default router;
