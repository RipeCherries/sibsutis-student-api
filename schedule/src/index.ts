import dotenv from 'dotenv';
import App from './core/app';

dotenv.config();

const app = new App();
app.start();
