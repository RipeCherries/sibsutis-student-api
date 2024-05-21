import { Request, Response } from 'express';
import LessonService from '../services/lessonService';

class LessonController {
  private lessonService: LessonService;

  constructor() {
    this.lessonService = new LessonService();
  }

  /**
   * **Обновляет список уроков.**
   *
   * *Примечания:*
   * - Функция принимает массив объектов уроков из тела запроса и обновляет данные в базе данных.
   * - Все существующие записи уроков сначала удаляются, затем добавляются новые записи.
   * - В случае успешного обновления данных, функция возвращает ответ с кодом состояния 204 (No Content).
   * - Если происходит ошибка при обновлении данных уроков, возвращается ответ с кодом состояния 500 (Internal Server Error) и сообщением об ошибке.
   *
   * @param req - Объект запроса Express, содержащий тело запроса с массивом уроков.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается ответом Express с кодом состояния 204 в случае успешного обновления данных или с кодом состояния 500 и сообщением об ошибке в случае ошибки.
   */
  async updateLessons(req: Request, res: Response): Promise<Response> {
    try {
      const { lessons } = req.body;
      await this.lessonService.updateLessons(lessons);

      return res.status(204).send();
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  /**
   * **Получает расписание уроков по названию группы.**
   *
   * *Примечания:*
   * - Функция принимает название группы из параметров запроса и возвращает список уроков для этой группы.
   * - Если расписание уроков для указанной группы не найдено, возвращается ответ с кодом состояния 404 (Not Found) и сообщением об ошибке.
   * - В случае успешного получения данных, возвращается ответ с кодом состояния 200 (OK) и списком уроков.
   * - Если происходит ошибка при получении данных, возвращается ответ с кодом состояния 500 (Internal Server Error) и сообщением об ошибке.
   *
   * @param req - Объект запроса Express, содержащий параметры запроса с названием группы.
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается ответом Express с кодом состояния 200 и списком уроков в случае успешного получения данных или с кодом состояния 404 и сообщением об ошибке, если данные не найдены, или с кодом состояния 500 и сообщением об ошибке в случае ошибки.
   */
  async getLessonsByGroupName(req: Request, res: Response): Promise<Response> {
    try {
      const { groupName } = req.params;
      const lessons = await this.lessonService.getLessonsByGroupName(groupName);

      if (lessons.length === 0) {
        return res.status(404).json({ error: 'Lessons not found.' });
      }

      return res.status(200).json(lessons);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  /**
   * **Получает все уроки.**
   *
   * *Примечания:*
   * - Функция не принимает никаких параметров запроса и возвращает список всех уроков.
   * - В случае успешного получения данных, возвращается ответ с кодом состояния 200 (OK) и списком уроков.
   * - Если происходит ошибка при получении данных, возвращается ответ с кодом состояния 500 (Internal Server Error) и сообщением об ошибке.
   *
   * @param _req - Объект запроса Express (не используется в данной функции).
   * @param res - Объект ответа Express.
   * @returns Промис, который разрешается ответом Express с кодом состояния 200 и списком всех уроков в случае успешного получения данных или с кодом состояния 500 и сообщением об ошибке в случае ошибки.
   */
  async getAllLessons(_req: Request, res: Response): Promise<Response> {
    try {
      const lessons = await this.lessonService.getAllLessons();

      return res.status(200).json(lessons);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default LessonController;
