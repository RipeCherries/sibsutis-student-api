import bcrypt from 'bcrypt';
import GroupModel from '../models/groupModel';
import UserModel from '../models/userModel';
import logger from '../utils/logger';

class UserService {
  /**
   * **Создает нового пользователя и возвращает информацию о созданном пользователе без пароля и идентификатора группы.**
   *
   * *Примечания:*
   * - Для успешного создания пользователя необходимо передать объект с данными нового пользователя (userData).
   * - Функция возвращает промис, который разрешается объектом модели пользователя без пароля и идентификатора группы в случае успешного создания.
   * - После создания пользователя, данные дополнительно запрашиваются из базы данных с исключением полей 'password' и 'groupID', а также с включением информации о группе пользователя.
   * - В случае возникновения ошибки при создании пользователя, функция выбрасывает исключение с сообщением об ошибке.
   *
   * @param userData - Объект, содержащий данные нового пользователя.
   * @returns Промис, который разрешается объектом модели пользователя без пароля и идентификатора группы в случае успешного создания.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async createUser(userData: Partial<UserModel>): Promise<UserModel> {
    try {
      const user = await UserModel.create(userData);
      const fullUser = await UserModel.findByPk(user.id, {
        attributes: { exclude: ['password', 'groupID'] },
        include: [{ model: GroupModel }],
      });

      return fullUser!.toJSON();
    } catch (e: any) {
      logger.error(`An error occurred when creating a user:\n${e}`);
      throw new Error('An error occurred when creating a user.');
    }
  }

  /**
   * **Получает информацию о пользователе по его уникальному идентификатору.**
   *
   * *Примечания:*
   * - Для успешного получения информации о пользователе необходимо передать уникальный идентификатор пользователя (userID).
   * - Функция возвращает промис, который разрешается объектом модели пользователя без идентификатора группы в случае успешного получения.
   * - Если пользователь с указанным идентификатором не найден, промис разрешается значением null.
   * - В случае возникновения ошибки при получении информации о пользователе, функция выбрасывает исключение с сообщением об ошибке.
   *
   * @param userID - Уникальный идентификатор пользователя.
   * @returns Промис, который разрешается объектом модели пользователя без идентификатора группы в случае успешного получения.
   * Если пользователь не найден, промис разрешается значением null.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async getUserByID(userID: number): Promise<UserModel | null> {
    try {
      const user = await UserModel.findByPk(userID, {
        attributes: { exclude: ['groupID'] },
        include: [{ model: GroupModel }],
      });

      if (!user) {
        return null;
      }

      return user.toJSON();
    } catch (e: any) {
      logger.error(`An error occurred while searching for the user:\n${e}`);
      throw new Error('An error occurred while searching for the user.');
    }
  }

  /**
   * **Получает информацию о пользователе по его email адресу.**
   *
   * *Примечания:*
   * - Для успешного получения информации о пользователе необходимо передать email адрес пользователя.
   * - Функция возвращает промис, который разрешается объектом модели пользователя без идентификатора группы в случае успешного получения.
   * - Если пользователь с указанным email не найден, промис разрешается значением null.
   * - В случае возникновения ошибки при получении информации о пользователе, функция выбрасывает исключение с сообщением об ошибке.
   *
   * @param email - Email адрес пользователя.
   * @returns Промис, который разрешается объектом модели пользователя без идентификатора группы в случае успешного получения.
   * Если пользователь не найден, промис разрешается значением null.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async getUserByEmail(email: string): Promise<UserModel | null> {
    try {
      const user = await UserModel.findOne({
        where: { email },
        attributes: { exclude: ['groupID'] },
        include: [{ model: GroupModel }],
      });

      if (!user) {
        return null;
      }

      return user.toJSON();
    } catch (e: any) {
      logger.error(`An error occurred while searching for the user:\n${e}`);
      throw new Error('An error occurred while searching for the user.');
    }
  }

  /**
   * **Удаляет пользователя по его уникальному идентификатору.**
   *
   * *Примечания:*
   * - Для успешного удаления пользователя необходимо передать уникальный идентификатор пользователя (userID).
   * - Функция возвращает промис, который разрешается значением void в случае успешного удаления пользователя.
   * - В случае возникновения ошибки при удалении пользователя, функция выбрасывает исключение с сообщением об ошибке.
   *
   * @param userID - Уникальный идентификатор пользователя.
   * @returns Промис, который разрешается значением void в случае успешного удаления.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async deleteUser(userID: number): Promise<void> {
    try {
      await UserModel.destroy({ where: { id: userID } });
    } catch (e: any) {
      logger.error(`An error occurred while deleting the user:\n${e}`);
      throw new Error('An error occurred while deleting the user.');
    }
  }

  /**
   * **Обновляет информацию о пользователе по его уникальному идентификатору.**
   *
   * *Примечания:*
   * - Для успешного обновления информации о пользователе необходимо передать уникальный идентификатор пользователя (userID), новое имя (firstname), новую фамилию (lastname), новый email (email), и новый идентификатор группы (groupID).
   * - Функция возвращает промис, который разрешается объектом модели пользователя без пароля и идентификатора группы в случае успешного обновления.
   * - Если пользователь с указанным идентификатором не найден, выбрасывается исключение с соответствующим сообщением.
   * - В случае возникновения ошибки при обновлении информации о пользователе, функция выбрасывает исключение с сообщением об ошибке.
   *
   * @param userID - Уникальный идентификатор пользователя.
   * @param firstname - Новое имя пользователя.
   * @param lastname - Новая фамилия пользователя.
   * @param email - Новый email пользователя.
   * @param groupID - Новый идентификатор группы пользователя.
   * @returns Промис, который разрешается объектом модели пользователя без пароля и идентификатора группы в случае успешного обновления.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async updateUser(
    userID: number,
    firstname: string,
    lastname: string,
    email: string,
    groupID: number,
  ): Promise<UserModel> {
    try {
      const user = await UserModel.findByPk(userID);

      user!.firstname = firstname;
      user!.lastname = lastname;
      user!.email = email;
      user!.groupID = groupID;

      await user!.save();

      const fullUser = await UserModel.findByPk(userID, {
        attributes: { exclude: ['password', 'groupID'] },
        include: [{ model: GroupModel }],
      });

      return fullUser!.toJSON();
    } catch (e: any) {
      logger.error(`An error occurred while updating the user's data:\n${e}`);
      throw new Error('An error occurred while updating the user\'s data.');
    }
  }

  /**
   * **Обновляет пароль пользователя по его уникальному идентификатору.**
   *
   * *Примечания:*
   * - Для успешного обновления пароля пользователя необходимо передать уникальный идентификатор пользователя (userID) и новый пароль (newPassword).
   * - Функция возвращает промис, который разрешается значением void в случае успешного обновления пароля пользователя.
   * - Если пользователь с указанным идентификатором не найден, выбрасывается исключение с соответствующим сообщением.
   * - В случае возникновения ошибки при обновлении пароля пользователя, функция выбрасывает исключение с сообщением об ошибке.
   *
   * @param userID - Уникальный идентификатор пользователя.
   * @param newPassword - Новый пароль пользователя.
   * @returns Промис, который разрешается значением void в случае успешного обновления пароля.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async updateUserPassword(userID: number, newPassword: string): Promise<void> {
    try {
      const user = await UserModel.findByPk(userID);
      user!.password = newPassword;

      await user!.save();
    } catch (e: any) {
      logger.error(`An error occurred while updating the user's password:\n${e}`);
      throw new Error('An error occurred while updating the user\'s password.');
    }
  }

  /**
   * **Получает список всех пользователей.**
   *
   * *Примечания:*
   * - Функция возвращает промис, который разрешается массивом объектов модели пользователя без полей "password" и "groupID".
   * - Каждый пользователь включает связанные данные из модели GroupModel.
   * - В случае возникновения ошибки при получении данных о пользователях, функция выбрасывает исключение с сообщением об ошибке.
   *
   * @returns Промис, который разрешается массивом объектов модели пользователя без пароля и идентификатора группы.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async getUsers(): Promise<UserModel[]> {
    try {
      let users = await UserModel.findAll({
        attributes: { exclude: ['password', 'groupID'] },
        include: [{ model: GroupModel }],
      });
      users = users.map((user) => user.toJSON());

      return users;
    } catch (e: any) {
      logger.error(`An error occurred while receiving users data:\n${e}`);
      throw new Error('An error occurred while receiving users data.');
    }
  }

  /**
   * **Проверяет соответствие пароля пользователя.**
   *
   * *Примечания:*
   * - Для проверки пароля необходимо передать введённый пользователем пароль (password) и хешированный пароль (userPassword), сохранённый в базе данных.
   * - Функция возвращает промис, который разрешается значением true, если пароли совпадают, и false, если нет.
   * - В случае возникновения ошибки при проверке пароля, функция выбрасывает исключение с сообщением об ошибке.
   *
   * @param password - Пароль, введённый пользователем.
   * @param userPassword - Хешированный пароль, сохранённый в базе данных.
   * @returns Промис, который разрешается значением true, если пароли совпадают, и false, если нет.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async checkPassword(password: string, userPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, userPassword);
    } catch (e: any) {
      logger.error(`An error occurred while verifying the user's password:\n${e}`);
      throw new Error('An error occurred while verifying the user\'s password');
    }
  }
}

export default UserService;
