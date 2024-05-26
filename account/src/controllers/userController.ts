import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import TokenService from '../services/tokenService';
import UserService from '../services/userService';

class UserController {
  private userService: UserService;

  private tokenService: TokenService;

  constructor() {
    this.userService = new UserService();
    this.tokenService = new TokenService();
  }

  /**
   * **Создаёт нового пользователя.**
   *
   * *Примечания:*
   * - Функция обрабатывает запрос на создание нового пользователя.
   * - Проверяет наличие всех обязательных полей (email, firstname, lastname, password, groupID) в теле запроса. Если какое-либо поле отсутствует, возвращает ответ с кодом 400 и сообщением об ошибке.
   * - Проверяет существование пользователя с указанным email. Если пользователь уже существует, возвращает ответ с кодом 409 и сообщением об ошибке.
   * - Создаёт нового пользователя с использованием userService.
   * - Генерирует JWT токены (access token и refresh token) с помощью tokenService и сохраняет refresh token.
   * - Возвращает ответ с кодом 201 и данными нового пользователя вместе с токенами.
   * - В случае возникновения ошибки возвращает ответ с кодом 500 и сообщением об ошибке.
   *
   * @param req - Объект запроса Express.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается объектом ответа Express с данными нового пользователя и JWT токенами, или ошибкой в случае неудачи.
   *
   * @throws {Error} Если произошла ошибка при создании пользователя.
   */
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData: Partial<UserModel> = req.body;

      if (!(userData.email && userData.firstname && userData.lastname && userData.password && userData.groupID)) {
        return res.status(400).json({ error: 'Required fields are missing.' });
      }

      // Проверка на существование пользователя
      const existingUser = await this.userService.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists.' });
      }

      // Создание нового пользователя
      const user = await this.userService.createUser(userData);

      // Генерация JWT токенов
      const payload = { userID: user.id, email: user.email };
      const tokens = this.tokenService.generateTokens(payload);
      await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);

      return res.status(201).json({ user, ...tokens });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  /**
   * **Выполняет вход пользователя.**
   *
   * *Примечания:*
   * - Функция обрабатывает запрос на вход пользователя.
   * - Извлекает userEmail и userPassword из тела запроса.
   * - Проверяет существование пользователя с указанным email. Если пользователь не найден, возвращает ответ с кодом 404 и сообщением об ошибке.
   * - Проверяет правильность введенного пароля. Если пароль неверен, возвращает ответ с кодом 401 и сообщением об ошибке.
   * - Удаляет поле 'password' из объекта пользователя перед возвращением данных.
   * - Генерирует JWT токены (access token и refresh token) с помощью tokenService и сохраняет refresh token.
   * - Возвращает ответ с кодом 200 и данными пользователя (без пароля) вместе с токенами.
   * - В случае возникновения ошибки возвращает ответ с кодом 500 и сообщением об ошибке.
   *
   * @param req - Объект запроса Express.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается объектом ответа Express с данными пользователя (без пароля) и JWT токенами, или ошибкой в случае неудачи.
   *
   * @throws {Error} Если произошла ошибка при входе пользователя.
   */
  async loginUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userEmail, userPassword } = req.body;

      // Проверка на существование пользователя
      const user = await this.userService.getUserByEmail(userEmail);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Проверка пароля
      const passwordVerificationResult = await this.userService.checkPassword(userPassword, user.password);
      if (!passwordVerificationResult) {
        return res.status(401).json({ error: 'Invalid password.' });
      }

      // Удаление поля 'password' из выдачи
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;

      // Генерация JWT токенов
      const payload = { userID: user.id, email: user.email };
      const tokens = this.tokenService.generateTokens(payload);
      await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);

      return res.status(200).json({ user: userWithoutPassword, ...tokens });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  /**
   * **Получает пользователя по ID.**
   *
   * *Примечания:*
   * - Функция обрабатывает запрос на получение данных пользователя по ID.
   * - Извлекает ID пользователя из параметров запроса.
   * - Проверяет существование пользователя с указанным ID. Если пользователь не найден, возвращает ответ с кодом 404 и сообщением об ошибке.
   * - Удаляет поле 'password' из объекта пользователя перед возвращением данных.
   * - Возвращает ответ с кодом 200 и данными пользователя (без пароля).
   * - В случае возникновения ошибки возвращает ответ с кодом 500 и сообщением об ошибке.
   *
   * @param req - Объект запроса Express.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается объектом ответа Express с данными пользователя (без пароля), или ошибкой в случае неудачи.
   *
   * @throws {Error} Если произошла ошибка при получении данных пользователя.
   */
  async getUserByID(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      // Проверка на существование пользователя
      const user = await this.userService.getUserByID(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Удаление поля 'password' из выдачи
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;

      return res.status(200).json(userWithoutPassword);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  /**
   * **Удаляет пользователя по ID.**
   *
   * *Примечания:*
   * - Функция обрабатывает запрос на удаление пользователя по ID.
   * - Извлекает ID пользователя из параметров запроса.
   * - Проверяет существование пользователя с указанным ID. Если пользователь не найден, возвращает ответ с кодом 404 и сообщением об ошибке.
   * - Удаляет токен пользователя с использованием tokenService.
   * - Удаляет пользователя с использованием userService.
   * - Возвращает ответ с кодом 204 при успешном удалении пользователя.
   * - В случае возникновения ошибки возвращает ответ с кодом 500 и сообщением об ошибке.
   *
   * @param req - Объект запроса Express.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается объектом ответа Express с кодом состояния 204 при успешном удалении, или с сообщением об ошибке в случае неудачи.
   *
   * @throws {Error} Если произошла ошибка при удалении пользователя.
   */
  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      // Проверка на существование пользователя
      const user = await this.userService.getUserByID(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      await this.tokenService.deleteToken(id);
      await this.userService.deleteUser(id);

      return res.status(204).send();
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  /**
   * **Обновляет данные пользователя по его ID.**
   *
   * *Примечания:*
   * - Функция обрабатывает запрос на обновление данных пользователя по ID.
   * - Извлекает ID пользователя из параметров запроса и новые данные пользователя из тела запроса.
   * - Проверяет существование пользователя с указанным ID. Если пользователь не найден, возвращает ответ с кодом 404 и сообщением об ошибке.
   * - Обновляет данные пользователя с использованием userService.
   * - Возвращает обновленные данные пользователя в ответе с кодом 200.
   * - В случае возникновения ошибки возвращает ответ с кодом 500 и сообщением об ошибке.
   *
   * @param req - Объект запроса Express, содержащий ID пользователя в параметрах и новые данные пользователя в теле запроса.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается объектом ответа Express с обновленными данными пользователя или с сообщением об ошибке.
   *
   * @throws {Error} Если произошла ошибка при обновлении данных пользователя.
   */
  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userID = Number(req.params.id);
      const { firstname, lastname, email, groupID } = req.body;

      // Проверка на существование пользователя
      const user = await this.userService.getUserByID(userID);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const updatedUser = await this.userService.updateUser(userID, firstname, lastname, email, groupID);

      return res.status(200).json(updatedUser);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  /**
   * **Обновляет пароль пользователя по его ID.**
   *
   * *Примечания:*
   * - Функция обрабатывает запрос на обновление пароля пользователя по ID.
   * - Извлекает ID пользователя из параметров запроса и старый и новый пароли из тела запроса.
   * - Проверяет существование пользователя с указанным ID. Если пользователь не найден, возвращает ответ с кодом 404 и сообщением об ошибке.
   * - Проверяет правильность старого пароля. Если старый пароль неверный, возвращает ответ с кодом 401 и сообщением об ошибке.
   * - Обновляет пароль пользователя с использованием userService.
   * - Возвращает подтверждение успешного обновления пароля в ответе с кодом 204.
   * - В случае возникновения ошибки возвращает ответ с кодом 500 и сообщением об ошибке.
   *
   * @param req - Объект запроса Express, содержащий ID пользователя в параметрах и старый и новый пароли в теле запроса.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается объектом ответа Express с подтверждением успешного обновления пароля или с сообщением об ошибке.
   *
   * @throws {Error} Если произошла ошибка при обновлении пароля пользователя.
   */
  async updateUserPassword(req: Request, res: Response): Promise<Response> {
    try {
      const userID = Number(req.params.id);
      const { oldPassword, newPassword } = req.body;

      // Проверка на существование пользователя
      const user = await this.userService.getUserByID(userID);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Проверка старого пароля
      const passwordVerificationResult = await this.userService.checkPassword(oldPassword, user.password);
      if (!passwordVerificationResult) {
        return res.status(401).json({ error: 'Invalid old password.' });
      }

      // Обновление пароля пользователя
      await this.userService.updateUserPassword(userID, newPassword);

      return res.status(204).send();
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  /**
   * **Возвращает список всех пользователей.**
   *
   * *Примечания:*
   * - Функция обрабатывает запрос на получение всех пользователей.
   * - Не использует объект запроса (_req), так как все пользователи возвращаются без учета дополнительных параметров.
   * - Вызывает метод userService.getUsers для получения списка всех пользователей.
   * - Возвращает ответ с кодом 200 и JSON-объектом, содержащим список всех пользователей.
   * - В случае возникновения ошибки возвращает ответ с кодом 500 и сообщением об ошибке.
   *
   * @param _req - Объект запроса Express (не используется в данной функции).
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается объектом ответа Express со списком всех пользователей или сообщением об ошибке.
   *
   * @throws {Error} Если произошла ошибка при получении списка пользователей.
   */
  async getAllUsers(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getUsers();

      return res.status(200).json(users);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  /**
   * **Обновляет JWT токены.**
   *
   * *Примечания:*
   * - Функция обрабатывает запрос на обновление JWT токенов.
   * - Получает refresh-токен из тела запроса.
   * - Проверяет наличие refresh-токена в запросе. Если он отсутствует, возвращает ответ с кодом 400 и сообщением об ошибке.
   * - Проверяет валидность переданного refresh-токена с помощью метода tokenService.verifyRefreshToken. Если токен невалиден, возвращает ответ с кодом 401 и сообщением об ошибке.
   * - Проверяет наличие токена в базе данных с помощью метода tokenService.findToken. Если токен не найден в базе данных, возвращает ответ с кодом 401 и сообщением об ошибке.
   * - Генерирует новые JWT токены и сохраняет новый refresh-токен в базе данных.
   * - Возвращает ответ с кодом 201 и JSON-объектом, содержащим новые токены.
   * - В случае возникновения ошибки возвращает ответ с кодом 500 и сообщением об ошибке.
   *
   * @param req - Объект запроса Express.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается объектом ответа Express с новыми токенами или сообщением об ошибке.
   *
   * @throws {Error} Если произошла ошибка при обновлении токенов.
   */
  async refreshTokens(req: Request, res: Response): Promise<Response> {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ error: 'Required fields are missing.' });
      }

      const userData = this.tokenService.verifyRefreshToken(token);

      if (!userData) {
        return res.status(401).json({ error: 'Invalid token.' });
      }

      const tokenFromDB = this.tokenService.findToken(token);

      if (!tokenFromDB) {
        return res.status(401).json({ error: 'Token not found in database.' });
      }

      const payload = { userID: userData.userID, email: userData.email };
      const tokens = this.tokenService.generateTokens(payload);
      await this.tokenService.saveRefreshToken(userData.userID, tokens.refreshToken);

      return res.status(201).json(tokens);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  /**
   * **Проверяет токен доступа.**
   *
   * *Примечания:*
   * - Функция принимает токен доступа из тела запроса и проверяет его валидность.
   * - Если токен отсутствует в теле запроса, возвращается ответ с кодом состояния 400 (Bad Request) и сообщением об ошибке.
   * - Если токен недействителен, возвращается ответ с кодом состояния 401 (Unauthorized) и сообщением об ошибке.
   * - В случае успешной проверки токена, возвращается ответ с кодом состояния 200 (OK) и сообщением о валидности токена.
   * - Если происходит ошибка при проверке токена, возвращается ответ с кодом состояния 500 (Internal Server Error) и сообщением об ошибке.
   *
   * @param req - Объект запроса Express, содержащий тело запроса с токеном.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается ответом Express с кодом состояния 200 и сообщением о валидности токена в случае успешной проверки, или с кодом состояния 400, 401, или 500 и сообщением об ошибке в случае ошибки.
   */
  async verifyToken(req: Request, res: Response): Promise<Response> {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ error: 'Required fields are missing.' });
      }

      const userData = this.tokenService.verifyAccessToken(token);

      if (!userData) {
        return res.status(401).json({ error: 'Invalid token.' });
      }

      return res.status(200).json({ message: 'Token is valid.' });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default UserController;
