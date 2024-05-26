import dotenv from 'dotenv';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import logger from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/account', createProxyMiddleware({ target: 'http://account:8001', changeOrigin: true }));
app.use('/schedule', createProxyMiddleware({ target: 'http://schedule:8002', changeOrigin: true }));

app.listen(port, () => {
  logger.info(`Gateway is launched at http://localhost:${port}`);
});
