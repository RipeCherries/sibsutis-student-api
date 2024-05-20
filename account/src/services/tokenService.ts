import jwt from 'jsonwebtoken';
import TokenModel from '../models/tokenModel';
import logger from '../utils/logger';

export interface UserData {
  userID: number;
  email: string;
}

interface TokensData {
  accessToken: string;
  refreshToken: string;
}

class TokenService {
  /**
   * **Генерирует JWT токены (доступа и обновления) на основе предоставленных данных пользователя.**
   *
   * *Примечания:*
   * - Функция создает два токена: accessToken и refreshToken.
   * - accessToken имеет срок действия 30 минут.
   * - refreshToken имеет срок действия 1 час.
   * - Для создания токенов используются секретные ключи, хранящиеся в переменных окружения: `ACCESS_TOKEN_SECRET` и `REFRESH_TOKEN_SECRET`.
   * - Возвращаемый объект содержит оба токена.
   *
   * @param payload - Объект, содержащий данные пользователя, которые будут включены в токены.
   * @returns Объект, содержащий два свойства: accessToken и refreshToken.
   */
  generateTokens(payload: UserData): TokensData {
    const accessToken = jwt.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, String(process.env.REFRESH_TOKEN_SECRET), { expiresIn: '1h' });

    return { accessToken, refreshToken } as TokensData;
  }

  /**
   * **Сохраняет или обновляет токен обновления (refresh token) для указанного пользователя.**
   *
   * *Примечания:*
   * - Функция проверяет, существует ли запись с refresh token для указанного пользователя.
   * - Если запись существует, токен обновляется.
   * - Если записи не существует, создается новая запись с токеном.
   * - В случае успешного выполнения возвращается объект модели токена (TokenModel).
   * - Если возникает ошибка, она логируется и выбрасывается исключение с соответствующим сообщением.
   *
   * @param userID - Уникальный идентификатор пользователя.
   * @param refreshToken - Токен обновления, который необходимо сохранить.
   * @returns Промис, который разрешается объектом модели токена (TokenModel) после успешного сохранения или обновления.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async saveRefreshToken(userID: number, refreshToken: string): Promise<TokenModel> {
    try {
      const tokenData = await TokenModel.findOne({ where: { userID } });

      if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
      }

      return TokenModel.create({ userID, refreshToken });
    } catch (e: any) {
      logger.error(`An error occurred while saving the refresh token:\n${e}`);
      throw new Error('An error occurred while saving the refresh token.');
    }
  }

  /**
   * **Ищет токен обновления (refresh token) в базе данных.**
   *
   * *Примечания:*
   * - Функция выполняет поиск записи в базе данных, соответствующей переданному токену обновления.
   * - В случае успешного выполнения возвращается объект модели токена (TokenModel) или null, если токен не найден.
   * - Если возникает ошибка, она логируется и выбрасывается исключение с соответствующим сообщением.
   *
   * @param refreshToken - Токен обновления, который необходимо найти.
   * @returns Промис, который разрешается объектом модели токена (TokenModel) или null, если токен не найден.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async findToken(refreshToken: string): Promise<TokenModel | null> {
    try {
      return await TokenModel.findOne({ where: { refreshToken } });
    } catch (e: any) {
      logger.error(`An error occurred while searching for the token:\n${e}`);
      throw new Error('An error occurred while searching for the token.');
    }
  }

  /**
   * **Удаляет токен обновления (refresh token) из базы данных по идентификатору пользователя.**
   *
   * *Примечания:*
   * - Функция выполняет удаление записи в базе данных, соответствующей переданному идентификатору пользователя.
   * - В случае успешного выполнения промис разрешается значением void.
   * - Если возникает ошибка, она логируется и выбрасывается исключение с соответствующим сообщением.
   *
   * @param userID - Идентификатор пользователя, для которого необходимо удалить токен обновления.
   * @returns Промис, который разрешается значением void в случае успешного удаления токена.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async deleteToken(userID: number): Promise<void> {
    try {
      await TokenModel.destroy({ where: { userID } });
    } catch (e: any) {
      logger.error(`An error occurred while deleting the token:\n${e}`);
      throw new Error('An error occurred while deleting the token.');
    }
  }

  /**
   * **Проверяет токен обновления (refresh token) и возвращает данные пользователя.**
   *
   * *Примечания:*
   * - Функция декодирует и проверяет токен обновления с использованием секретного ключа.
   * - В случае успешной проверки токена, возвращает данные пользователя.
   * - Если токен недействителен или возникает ошибка, она логируется и выбрасывается исключение с соответствующим сообщением.
   *
   * @param refreshToken - Токен обновления, который необходимо проверить.
   * @returns Данные пользователя, закодированные в токене, если проверка успешна.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  verifyRefreshToken(refreshToken: string): UserData {
    try {
      return jwt.verify(refreshToken, String(process.env.REFRESH_TOKEN_SECRET)) as UserData;
    } catch (e: any) {
      logger.error(`An error occurred while verifying the refresh token:\n${e}`);
      throw new Error('An error occurred while verifying the refresh token.');
    }
  }

  /**
   * **Проверяет токен доступа (access token) и возвращает данные пользователя.**
   *
   * *Примечания:*
   * - Функция декодирует и проверяет токен доступа с использованием секретного ключа.
   * - В случае успешной проверки токена, возвращает данные пользователя.
   * - Если токен недействителен или возникает ошибка, она логируется и выбрасывается исключение с соответствующим сообщением.
   *
   * @param accessToken - Токен доступа, который необходимо проверить.
   * @returns Данные пользователя, закодированные в токене, если проверка успешна.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  verifyAccessToken(accessToken: string): UserData {
    try {
      return jwt.verify(accessToken, String(process.env.ACCESS_TOKEN_SECRET)) as UserData;
    } catch (e: any) {
      logger.error(`An error occurred while verifying the access token:\n${e}`);
      throw new Error('An error occurred while verifying the access token.');
    }
  }
}

export default TokenService;
