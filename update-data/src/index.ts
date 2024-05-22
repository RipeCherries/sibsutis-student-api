import dotenv from 'dotenv';
import App from './core/app';

dotenv.config();

const dbURI = String(process.env.DB_URI);
const baseURL = String(process.env.SIBSUTIS_SHEDULE_BASE_URL);

const app = new App(dbURI, baseURL);
app.initialize().then(() => {
  app.start(20 * 60 * 60 * 1000);
});
