import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger';

const router = express.Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
