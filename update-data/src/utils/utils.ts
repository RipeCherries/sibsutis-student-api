import { Lesson } from '../types/lesson';
import { Schedule } from '../types/schedule';

class Utils {
  /**
   * **Преобразует строку даты в объект Date.**
   *
   * *Примечания:*
   * - Функция принимает строку даты в формате "день.месяц.год часы:минуты:секунды".
   * - Дата разбивается на составляющие (день, месяц, год, время) с использованием регулярного выражения для разделения по точке, пробелу и двоеточию.
   * - Месяц приводится к индексу (0-11) для создания объекта Date.
   * - Время также разбивается и преобразуется в массив чисел.
   * - Функция возвращает объект Date, созданный из этих составляющих.
   *
   * @param dateString - Строка даты в формате "день.месяц.год часы:минуты:секунды".
   * @returns Объект Date, представляющий указанную дату и время.
   */
  public convertStringDateToDateObject(dateString: string): Date {
    const [day, month, year, time] = dateString.split(/[.\s:]/);

    const monthIndex = parseInt(month, 10) - 1;

    return new Date(parseInt(year, 10), monthIndex, parseInt(day, 10), ...time.split(':').map(Number));
  }

  /**
   * **Парсит расписание и извлекает уникальные группы.**
   *
   * *Примечания:*
   * - Функция принимает массив объектов расписания (`Schedule[]`), каждый из которых содержит информацию о занятии, включая группу (`GROUP`).
   * - Для хранения уникальных групп используется множество (`Set`), что позволяет автоматически исключать дубликаты.
   * - После заполнения множества уникальными группами, оно преобразуется в массив строк.
   * - Функция возвращает массив строк, представляющий все уникальные группы, найденные в расписании.
   *
   * @param schedule - Массив объектов расписания, содержащий информацию о занятиях, включая группу (`GROUP`).
   * @returns Массив строк, представляющий уникальные группы, извлеченные из расписания.
   */
  public parseGroups(schedule: Schedule[]): string[] {
    const uniqueGroups: Set<string> = new Set();

    schedule.forEach((element) => {
      if (element.GROUP) {
        uniqueGroups.add(element.GROUP);
      }
    });

    return Array.from(uniqueGroups) as string[];
  }

  /**
   * **Парсит расписание и преобразует его в массив объектов уроков.**
   *
   * *Примечания:*
   * - Функция принимает массив объектов расписания (`Schedule[]`), каждый из которых содержит информацию о занятии.
   * - Каждый объект расписания преобразуется в объект урока (`Lesson`), включающий такие поля, как название, тип, преподаватель, аудитория, группа, неделя, день недели и время начала.
   * - Для удобства отображения, имя преподавателя форматируется, сокращая отчество и фамилию до инициалов.
   * - Если какое-либо поле отсутствует в объекте расписания, оно заполняется пустой строкой.
   * - Функция возвращает массив объектов уроков, созданных из расписания.
   *
   * @param schedule - Массив объектов расписания, содержащий информацию о занятиях.
   * @returns Массив объектов уроков (`Lesson[]`), преобразованных из расписания.
   */
  public parseSchedule(schedule: Schedule[]): Lesson[] {
    const lessons: Lesson[] = [];

    schedule.forEach((element) => {
      const lesson: Lesson = {
        name: element.DISCIPLINE ? element.DISCIPLINE : '',
        type: element.TYPE_LESSON ? element.TYPE_LESSON : '',
        teacher: element.TEACHER ? element.TEACHER.replace(/(.+) (.).+ (.).+/, '$1 $2. $3.') : '',
        classroom: element.CLASSROOM ? element.CLASSROOM : '',
        group: element.GROUP ? element.GROUP : '',
        week: element.WEEK ? element.WEEK : '',
        weekday: element.WEEK_DAY ? element.WEEK_DAY : '',
        startHour: element.DATE_BEGIN ? element.DATE_BEGIN.split(' ')[1].slice(0, 2) : '',
      };

      lessons.push(lesson);
    });

    return lessons;
  }
}

export default Utils;
