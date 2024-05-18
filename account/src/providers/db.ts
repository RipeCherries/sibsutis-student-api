import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import GroupModel from '../models/groupModel';
import TokenModel from '../models/tokenModel';
import UserModel from '../models/userModel';
import logger from '../utils/logger';

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

sequelize.addModels([UserModel, TokenModel, GroupModel]);

sequelize.sync().then(() => {
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
