import axios from 'axios';
import mongoose from 'mongoose';
import LastUpdate, { LastUpdateInterface } from '../models/lastUpdateModel';
import Token, { TokenInterface } from '../models/tokenModel';
import { Lesson } from '../types/lesson';
import { Schedule } from '../types/schedule';
import logger from '../utils/logger';
import Utils from '../utils/utils';

class App {
  private readonly dbURI: string;

  private readonly baseURL: string;

  private accessToken: string;

  private refreshToken: string;

  private utils: Utils;

  constructor(dbURI: string, baseURL: string) {
    this.dbURI = dbURI;
    this.baseURL = baseURL;

    this.accessToken = '';
    this.refreshToken = '';

    this.utils = new Utils();
  }

  /**
   * **Загружает токены из базы данных.**
   *
   * *Примечания:*
   * - Функция выполняет асинхронный запрос к базе данных для получения токенов.
   * - В случае успешного извлечения токенов, функция возвращает объект `TokenInterface`.
   * - Если извлечение прошло успешно, в лог записывается сообщение об успешной операции.
   * - В случае возникновения ошибки при извлечении токенов, она логируется, и функция выбрасывает исключение.
   *
   * @returns Промис, который разрешается объектом `TokenInterface`, содержащим данные токенов.
   * @throws Исключение, если произошла ошибка при извлечении токенов из базы данных.
   */
  private async loadTokens(): Promise<TokenInterface> {
    try {
      const tokensData: TokenInterface = (await Token.findOne({})) as TokenInterface;
      logger.info('Successful extraction of tokens from the database.');
      return tokensData;
    } catch (e: any) {
      logger.error(`An error occurred while unloading tokens from the database:\n${e}`);
      throw e;
    }
  }

  /**
   * **Подключается к базе данных.**
   *
   * *Примечания:*
   * - Функция выполняет асинхронное подключение к базе данных с использованием URI, указанного в `this.dbURI`.
   * - В случае успешного подключения, в лог записывается сообщение об успешной операции.
   * - В случае возникновения ошибки при подключении, она логируется, и функция выбрасывает исключение.
   *
   * @returns Промис, который разрешается значением `void` при успешном подключении.
   * @throws Исключение, если произошла ошибка при подключении к базе данных.
   */
  private async connectToDB(): Promise<void> {
    try {
      await mongoose.connect(this.dbURI);
      logger.info('Successful connection to the database.');
    } catch (e: any) {
      logger.error(`An error occurred while connecting to the database:\n${e}`);
      throw e;
    }
  }

  /**
   * **Инициализирует приложение.**
   *
   * *Примечания:*
   * - Функция выполняет асинхронное подключение к базе данных с использованием метода `connectToDB`.
   * - После успешного подключения к базе данных, загружает токены с использованием метода `loadTokens` и сохраняет их в свойствах `this.accessToken` и `this.refreshToken`.
   * - В случае возникновения ошибки на любом из этапов, она логируется, и функция выбрасывает исключение.
   *
   * @returns Промис, который разрешается значением `void` при успешной инициализации.
   * @throws Исключение, если произошла ошибка при инициализации приложения.
   */
  public async initialize(): Promise<void> {
    try {
      await this.connectToDB();

      const tokensData: TokenInterface = await this.loadTokens();
      this.accessToken = tokensData.accessToken;
      this.refreshToken = tokensData.refreshToken;
    } catch (e: any) {
      logger.error(`An error occurred while initializing the application:\n${e}`);
      throw e;
    }
  }

  /**
   * **Проверяет дату последнего обновления данных.**
   *
   * *Примечания:*
   * - Функция отправляет POST-запрос на сервер для получения даты последнего обновления расписания.
   * - Если токен устарел (статус 401), вызывается функция `refreshTokens`, и проверка повторяется.
   * - Сравнивается полученная дата последнего обновления с датой из базы данных.
   * - Если данные нуждаются в обновлении, дата обновляется в базе данных и возвращается `true`.
   * - Если данные не нуждаются в обновлении, возвращается `false`.
   * - В случае возникновения ошибки логируется сообщение об ошибке, и функция возвращает `false`.
   *
   * @returns Промис, который разрешается значением `boolean`, указывающим, нужно ли обновлять данные (`true`), или нет (`false`).
   * @throws Исключение, если произошла ошибка при проверке даты последнего обновления.
   */
  private async checkLastUpdate(): Promise<boolean> {
    try {
      const formData: URLSearchParams = new URLSearchParams();
      formData.append('token', this.accessToken);

      const lastUpdateResponse = await axios({
        method: 'post',
        url: `${this.baseURL}/get_last_update_schedule/`,
        data: formData,
      });

      if (lastUpdateResponse.data.status_code === 401) {
        logger.warn('Tokens are outdated, an update is needed.');
        await this.refreshTokens();
        return await this.checkLastUpdate();
      }

      const fetchedLastUpdate = this.utils.convertStringDateToDateObject(lastUpdateResponse.data.last_date_update);
      const { date } = (await LastUpdate.findOne({})) as LastUpdateInterface;

      if (date < fetchedLastUpdate.getTime()) {
        await LastUpdate.updateOne({}, { date: fetchedLastUpdate.getTime() });
        logger.info('Data needs to be updated.');
        return true;
      }

      logger.info('There is no need to update the data.');
      return false;
    } catch (e: any) {
      logger.error(`An error occurred while trying to find out the date of the last update:\n${e}`);
      return false;
    }
  }

  /**
   * **Обновляет токены доступа и обновления.**
   *
   * *Примечания:*
   * - Функция отправляет POST-запрос на сервер для обновления токенов с использованием текущего refresh-токена.
   * - В случае успешного обновления (статус 200) обновляет значения `accessToken` и `refreshToken` в классе.
   * - Также обновляет токены в базе данных.
   * - В случае ошибки логирует сообщение об ошибке и выбрасывает исключение.
   *
   * @returns {Promise<void>} Промис, который разрешается при успешном обновлении токенов.
   *
   * @throws Исключение, если произошла ошибка при обновлении токенов.
   */
  private async refreshTokens(): Promise<void> {
    try {
      const formData: URLSearchParams = new URLSearchParams();
      formData.append('token', this.refreshToken);

      const updateTokensResponse = await axios({
        method: 'post',
        url: `${this.baseURL}/update_tokens/`,
        data: formData,
      });

      if (updateTokensResponse.data.status_code === 200) {
        logger.info('Successful token renewal.');

        this.accessToken = updateTokensResponse.data.access_token;
        this.refreshToken = updateTokensResponse.data.refresh_token;

        await Token.updateOne(
          {},
          {
            accessToken: updateTokensResponse.data.access_token,
            refreshToken: updateTokensResponse.data.refresh_token,
          },
        );
      }
    } catch (e: any) {
      logger.error(`An error occurred while updating tokens:\n${e}`);
      throw e;
    }
  }

  /**
   * **Получает данные расписания.**
   *
   * *Примечания:*
   * - Функция отправляет POST-запрос на сервер для получения обновленных данных расписания, используя текущий access-токен.
   * - В случае если токены устарели (статус 401), выполняется обновление токенов и повторная попытка получения данных.
   * - В случае успешного получения данных логирует сообщение об успешном получении.
   *
   * @returns {Promise<Schedule[]>} Промис, который разрешается массивом данных расписания.
   *
   * @throws Исключение, если произошла ошибка при получении данных.
   */
  private async fetchData(): Promise<Schedule[]> {
    try {
      const formData: URLSearchParams = new URLSearchParams();
      formData.append('token', this.accessToken);

      const dataResponse = await axios({
        method: 'post',
        url: `${this.baseURL}/get_plan_schedule/`,
        data: formData,
      });

      if (dataResponse.data.status_code === 401) {
        logger.warn('Tokens are outdated, an update is needed.');
        await this.refreshTokens();
        return await this.fetchData();
      }

      logger.info('Successful receipt of updated data.');

      return dataResponse.data.schedule as Schedule[];
    } catch (e: any) {
      logger.error(`An error occurred while receiving the data:\n${e}`);
      throw e;
    }
  }

  /**
   * **Запускает процесс регулярного обновления данных.**
   *
   * *Примечания:*
   * - Функция запускает процесс проверки необходимости обновления данных и их получения с заданным интервалом.
   * - В случае необходимости обновления данных, функция:
   *   1. Проверяет необходимость обновления данных вызовом `checkLastUpdate`.
   *   2. Если обновление необходимо, получает данные расписания вызовом `fetchData`.
   *   3. Парсит полученные данные для извлечения групп и уроков.
   *   4. Отправляет обновленные данные о группах и уроках другим микросервисам.
   *   5. Логирует успешное распределение свежих данных.
   *
   * @param {number} interval - Интервал в миллисекундах между обновлениями данных.
   *
   * @returns {void} Функция не возвращает значение.
   */
  public start(interval: number): void {
    const updateData = async (): Promise<void> => {
      const updateRequired = await this.checkLastUpdate();
      if (!updateRequired) {
        return;
      }

      const schedule: Schedule[] = await this.fetchData();

      const groups: string[] = this.utils.parseGroups(schedule);
      const lessons: Lesson[] = this.utils.parseSchedule(schedule);

      await axios.put('http://account:8001/groups', { groups });
      await axios.put('http://schedule:8002/lessons', { lessons });

      logger.info('Successful distribution of fresh data to other microservices.');
    };

    updateData().then();

    setInterval(updateData, interval);
  }
}

export default App;
