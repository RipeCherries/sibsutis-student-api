import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

/**
 * **Промежуточная функция для проверки токена доступа.**
 *
 * *Примечания:*
 * - Функция проверяет наличие заголовка авторизации в запросе и извлекает токен доступа.
 * - Если заголовок авторизации или токен отсутствуют, возвращается ответ с кодом состояния 401 (Unauthorized) и сообщением об ошибке.
 * - Токен проверяется отправкой запроса на локальный сервер аутентификации.
 * - Если токен недействителен или происходит ошибка на сервере аутентификации, возвращается соответствующий ответ с кодом состояния 401 или 500.
 * - В случае успешной проверки токена, выполнение запроса передается следующему обработчику (middleware) с помощью вызова функции `next()`.
 * - Если происходит ошибка при проверке токена, возвращается ответ с кодом состояния 500 (Internal Server Error) и сообщением об ошибке.
 *
 * @param req - Объект запроса Express.
 * @param res - Объект ответа Express.
 * @param next - Функция next для передачи управления следующему middleware.
 * @returns Промис, который разрешается вызовом функции next() в случае успешной проверки токена, или ответом Express с кодом состояния 401 или 500 и сообщением об ошибке в случае ошибки.
 */
async function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'The authorization header is missing.' });
    }

    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) {
      return res.status(401).json({ error: 'Access token is missing.' });
    }

    const verifyResult = await axios.post('http://account:8001/verify-token', { token: accessToken });

    if (verifyResult.status === 401) {
      return res.status(401).json(verifyResult.data);
    }

    if (verifyResult.status === 500) {
      return res.status(500).json(verifyResult.data);
    }

    return next();
  } catch (e: any) {
    logger.error(`An error occurred while verifying the token:\n${e}`);
    return res.status(500).json({ error: e.message });
  }
}

export default verifyAccessToken;
