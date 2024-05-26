import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import LessonModel from '../models/lessonModel';
import TimeModel from '../models/timeModel';
import logger from '../utils/logger';
import timeInitialization from '../utils/timeInitialization';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: String(process.env.DATABASE_NAME),
  username: String(process.env.DATABASE_USERNAME),
  password: String(process.env.DATABASE_PASSWORD),
  host: String(process.env.DATABASE_HOST),
  port: Number(process.env.DATABASE_PORT),
  logging: false,
});

sequelize.addModels([LessonModel, TimeModel]);

sequelize.sync().then(() => {
  timeInitialization().then(() => {
    logger.info('Successful initialization of class time');
  });

  logger.info('Successful synchronization of database models.');
});

async function connect(): Promise<void> {
  try {
    await sequelize.authenticate();
    logger.info('Successful connection to the database.');
  } catch (e: any) {
    logger.error(`An error occurred while connecting to the database:\n${e}`);
  }
}

connect().then();

export default sequelize;
