import { Request, Response } from 'express';
import GroupModel from '../models/groupModel';
import GroupService from '../services/groupService';

class GroupController {
  private groupService: GroupService;

  constructor() {
    this.groupService = new GroupService();
  }

  /**
   * **Обновляет группы на основе списка имен групп, полученных из тела запроса.**
   *
   * *Примечания:*
   * - Функция принимает список имен групп из тела запроса и обновляет их в базе данных.
   * - Группы, имена которых переданы в запросе, будут обновлены или созданы со статусом 'active'.
   * - Группы, имена которых отсутствуют в списке, будут обновлены со статусом 'inactive'.
   * - Если обновление групп прошло успешно, функция возвращает ответ с кодом 204 (No Content).
   * - В случае возникновения ошибки при обновлении групп, функция возвращает ответ с кодом 500 и сообщением об ошибке.
   *
   * @param req - Объект запроса Express, содержащий тела запроса с именами групп.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается объектом Response.
   * В случае ошибки возвращается ответ с кодом 500 и сообщением об ошибке.
   */
  async updateGroups(req: Request, res: Response): Promise<Response> {
    try {
      const groupNames: string[] = req.body.groups;

      await this.groupService.updateGroups(groupNames);

      return res.status(204).send();
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  /**
   * **Возвращает список всех активных групп.**
   *
   * *Примечания:*
   * - Функция обращается к сервису групп для получения всех групп со статусом 'active'.
   * - В случае успешного получения данных функция возвращает ответ с кодом 200 и списком групп в формате JSON.
   * - В случае возникновения ошибки при получении данных о группах, функция возвращает ответ с кодом 500 и сообщением об ошибке.
   *
   * @param _req - Объект запроса Express. В данном случае не используется.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается объектом Response с кодом 200 и списком активных групп в формате JSON.
   * В случае ошибки возвращается ответ с кодом 500 и сообщением об ошибке.
   */
  async getAllGroups(_req: Request, res: Response): Promise<Response> {
    try {
      const groups: GroupModel[] = await this.groupService.getAllGroups();

      return res.status(200).json(groups);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  /**
   * **Возвращает информацию о группе по её уникальному идентификатору.**
   *
   * *Примечания:*
   * - Функция обращается к сервису групп для получения данных о группе по указанному идентификатору (id).
   * - Если группа с указанным идентификатором не найдена, возвращается ответ с кодом 404 и сообщением 'Group not found'.
   * - В случае успешного получения данных о группе функция возвращает ответ с кодом 200 и информацией о группе в формате JSON.
   * - В случае возникновения ошибки при получении данных о группе, функция возвращает ответ с кодом 500 и сообщением об ошибке.
   *
   * @param req - Объект запроса Express. Параметр пути `id` используется для определения уникального идентификатора группы.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается объектом Response с кодом 200 и информацией о группе в формате JSON.
   * В случае ошибки возвращается ответ с кодом 500 и сообщением об ошибке.
   */
  async getGroupByID(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      // Проверка на существование группы
      const group = await this.groupService.getGroupByID(id);
      if (!group) {
        return res.status(404).json({ error: 'Group not found.' });
      }

      return res.status(200).json(group);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default GroupController;
