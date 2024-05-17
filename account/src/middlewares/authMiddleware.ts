import { Request, Response, NextFunction } from 'express';
import TokenService from '../services/tokenService';
import logger from '../utils/logger';

const tokenService = new TokenService();

/**
 * **Middleware для проверки доступа по access token.**
 *
 * *Примечания:*
 * - Middleware предназначен для проверки доступа по access token.
 * - Принимает объекты запроса (req) и ответа (res) Express, а также функцию next для передачи управления следующему middleware.
 * - Проверяет наличие заголовка авторизации и токена доступа.
 * - Верифицирует токен доступа с помощью сервиса tokenService.
 * - Сравнивает ID пользователя из параметров запроса с ID пользователя из данных токена.
 * - Если заголовок авторизации или токен отсутствуют, возвращает ответ с кодом 401 и соответствующим сообщением об ошибке.
 * - Если ID пользователя не совпадают, возвращает ответ с кодом 403 и сообщением об отказе в доступе.
 * - В случае возникновения ошибки при проверке токена возвращает ответ с кодом 500 и сообщением об ошибке.
 *
 * @param req - Объект запроса Express.
 * @param res - Объект ответа Express.
 * @param next - Функция next для передачи управления следующему middleware.
 * @returns Возвращает следующий middleware, если токен валидный и ID пользователя совпадают.
 * В случае ошибки возвращает соответствующий ответ с ошибкой.
 *
 * @throws {Error} Если возникла ошибка при проверке access token.
 */
function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const id = Number(req.params.id);

    if (!authHeader) {
      return res.status(401).json({ error: 'The authorization header is missing.' });
    }

    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) {
      return res.status(401).json({ error: 'Access token is missing.' });
    }

    const userData = tokenService.verifyAccessToken(accessToken);

    if (id !== userData.userID) {
      return res.status(403).json({ error: 'Access is denied.' });
    }

    return next();
  } catch (e: any) {
    logger.error(`An error occurred while verifying the token:\n${e}`);
    return res.status(500).json({ error: e.message });
  }
}

export default verifyAccessToken;
