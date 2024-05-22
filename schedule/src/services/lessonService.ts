import LessonModel from '../models/lessonModel';
import TimeModel from '../models/timeModel';
import { Lesson } from '../types/lesson';
import logger from '../utils/logger';

class LessonService {
  /**
   * **Обновляет список уроков в базе данных.**
   *
   * *Примечания:*
   * - Сначала удаляются все существующие записи в таблице уроков.
   * - Затем новые уроки создаются на основе переданного массива уроков.
   * - Для каждого урока находится соответствующая запись в таблице времени по времени начала (startHour).
   * - В случае возникновения ошибки при обновлении данных уроков, ошибка логируется и выбрасывается исключение с сообщением об ошибке.
   *
   * @param lessons - Массив объектов уроков, содержащий информацию о каждом уроке (имя, тип, преподаватель, класс, день недели, неделя, группа, время начала).
   * @returns Промис, который разрешается значением void в случае успешного обновления данных уроков.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async updateLessons(lessons: Lesson[]): Promise<void> {
    try {
      await LessonModel.destroy({ where: {} });

      await Promise.all(
        lessons.map(async (lesson: Lesson): Promise<void> => {
          const time = await TimeModel.findOne({ where: { startHour: lesson.startHour } });

          await LessonModel.create({
            name: lesson.name,
            type: lesson.type,
            teacher: lesson.teacher,
            classroom: lesson.classroom,
            weekday: lesson.weekday,
            week: lesson.week,
            group: lesson.group,
            timeID: time!.id,
          });
        }),
      );
    } catch (e: any) {
      logger.error(`An error occurred while updating lesson data:\n${e}`);
      throw new Error('An error occurred while updating lesson data.');
    }
  }

  /**
   * **Получает список уроков для указанной группы.**
   *
   * *Примечания:*
   * - Функция возвращает массив объектов уроков, связанных с указанной группой.
   * - Поле `timeID` исключено из возвращаемых атрибутов.
   * - Каждый урок включает данные из связанной модели времени (TimeModel).
   * - В случае возникновения ошибки при поиске расписания группы, ошибка логируется и выбрасывается исключение с сообщением об ошибке.
   *
   * @param groupName - Название группы, для которой нужно получить расписание уроков.
   * @returns Промис, который разрешается массивом объектов уроков для указанной группы.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async getLessonsByGroupName(groupName: string): Promise<LessonModel[]> {
    try {
      return await LessonModel.findAll({
        where: { group: groupName },
        attributes: { exclude: ['timeID'] },
        include: [{ model: TimeModel }],
      });
    } catch (e) {
      logger.error(`An error occurred while searching for the group schedule:\n${e}`);
      throw new Error('An error occurred while searching for the group schedule.');
    }
  }

  /**
   * **Получает список всех уроков.**
   *
   * *Примечания:*
   * - Функция возвращает массив объектов всех уроков.
   * - В случае возникновения ошибки при получении полного расписания, ошибка логируется и выбрасывается исключение с сообщением об ошибке.
   *
   * @returns Промис, который разрешается массивом объектов всех уроков.
   * В случае ошибки выбрасывается исключение с сообщением об ошибке.
   */
  async getAllLessons(): Promise<LessonModel[]> {
    try {
      return await LessonModel.findAll({
        attributes: { exclude: ['timeID'] },
        include: [{ model: TimeModel }],
      });
    } catch (e: any) {
      logger.error(`An error occurred while searching for the entire schedule:\n${e}`);
      throw new Error('An error occurred while searching for the entire schedule.');
    }
  }
}

export default LessonService;
