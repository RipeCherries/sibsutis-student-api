import GroupModel from '../models/groupModel';
import logger from '../utils/logger';

class GroupService {
  /**
   * **Обновляет статусы групп в базе данных в соответствии с переданными названиями групп.**
   *
   * *Примечания:*
   * - Для успешного выполнения обновления статусов групп необходимо передать массив названий групп (groupNames), которые должны быть активными.
   * - Функция выполняет следующие действия:
   *   1. Получает все группы из базы данных с помощью `GroupModel.findAll()`.
   *   2. Перебирает переданные названия групп и устанавливает их статус как 'active', если группа существует в базе данных.
   *   3. Создает новые записи в базе данных для групп, которых еще нет, и устанавливает их статус как 'active'.
   *   4. Устанавливает статус 'inactive' для всех остальных групп, которые не включены в переданный массив названий.
   * - Если возникает ошибка при обновлении данных о группах, функция выбрасывает исключение с сообщением об ошибке.
   *
   * @param groupNames - Массив строк, содержащий названия групп, которые должны быть активными.
   * @returns Промис, который разрешается после обновления статусов групп.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async updateGroups(groupNames: string[]): Promise<void> {
    try {
      const allGroups = await GroupModel.findAll();

      await Promise.all(
        groupNames.map(async (groupName) => {
          // Поиск записи с таким же названием группы в базе
          const existingGroup = allGroups.find((group) => group.name === groupName);

          if (existingGroup) {
            // Установка статуса 'active', если запись есть в базе
            await existingGroup.update({ status: 'active' });
          } else {
            // Создание новой записи в базе
            await GroupModel.create({ name: groupName, status: 'active' });
          }
        }),
      );

      // Установка статуса 'inactive' для оставшихся групп
      await Promise.all(
        allGroups.map(async (group) => {
          if (!groupNames.includes(group.name)) {
            await group.update({ status: 'inactive' });
          }
        }),
      );
    } catch (e: any) {
      logger.error(`An error occurred while updating group data:\n${e}`);
      throw new Error('An error occurred while updating group data.');
    }
  }

  /**
   * **Получает все группы со статусом 'active' из базы данных.**
   *
   * *Примечания:*
   * - Функция выполняет запрос к базе данных, чтобы получить все группы, у которых статус установлен как 'active'.
   * - Если возникает ошибка при получении данных о группах, функция выбрасывает исключение с сообщением об ошибке.
   * - Логирует сообщение об ошибке в случае сбоя.
   *
   * @returns Промис, который разрешается массивом объектов GroupModel с данными о текущих активных группах.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async getAllGroups(): Promise<GroupModel[]> {
    try {
      return await GroupModel.findAll({ where: { status: 'active' } });
    } catch (e: any) {
      logger.error(`An error occurred while getting data about current groups:\n${e}`);
      throw new Error('An error occurred while getting data about current groups.');
    }
  }

  /**
   * **Получает данные о группе по её уникальному идентификатору (groupID).**
   *
   * *Примечания:*
   * - Функция выполняет запрос к базе данных для получения данных о группе с указанным идентификатором.
   * - Если группа с указанным идентификатором не найдена, функция возвращает null.
   * - Если возникает ошибка при получении данных о группе, функция выбрасывает исключение с сообщением об ошибке.
   * - Логирует сообщение об ошибке в случае сбоя.
   *
   * @param groupID - Уникальный идентификатор группы.
   * @returns Промис, который разрешается объектом GroupModel с данными о группе, если группа найдена, или null, если группа не найдена.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async getGroupByID(groupID: number): Promise<GroupModel | null> {
    try {
      const group = await GroupModel.findByPk(groupID);

      if (!group) {
        return null;
      }

      return group.toJSON();
    } catch (e: any) {
      logger.error(`An error occurred while receiving data about a group:\n${e}`);
      throw new Error('An error occurred while receiving data about a group.');
    }
  }
}

export default GroupService;
