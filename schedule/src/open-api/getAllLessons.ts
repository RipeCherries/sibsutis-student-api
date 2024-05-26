const getAllLessons = {
  tags: ['Lesson'],
  description: 'Получение информации о расписании всех групп.',
  responses: {
    200: {
      description: 'Данные расписания всех групп.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', description: 'Идентификатор занятия.' },
                name: { type: 'string', description: 'Название дисциплины.' },
                type: { type: 'string', description: 'Тип занятия.' },
                teacher: { type: 'string', description: 'Фамилия И.О. преподавателя.' },
                classroom: { type: 'string', description: 'Аудитория.' },
                group: { type: 'string', description: 'Название группы.' },
                week: { type: 'string', description: 'Чётность недели.' },
                weekday: { type: 'string', description: 'День недели.' },
                createdAt: { type: 'string', description: 'Временная метка создания записи.' },
                updatedAt: { type: 'string', description: 'Временная метка последнего обновления записи.' },
                time: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', description: 'Идентификатор времени проведения занятия.' },
                    startHour: { type: 'string', description: 'Час начала занятия.' },
                    startMinutes: { type: 'string', description: 'Минуты начала занятия.' },
                    endHour: { type: 'string', description: 'Час конца занятия.' },
                    endMinutes: { type: 'string', description: 'Минуты конца занятия.' },
                    createdAt: { type: 'string', description: 'Временная метка создания записи.' },
                    updatedAt: { type: 'string', description: 'Временная метка последнего обновления записи.' },
                  },
                },
              },
            },
          },
          example: [
            {
              id: 25659,
              name: 'Защита информации в системах беспроводной связи',
              type: 'Лабораторные работы',
              teacher: 'Федоров А. А.',
              classroom: 'а.346 (К.5)',
              weekday: 'Четверг',
              group: 'АБ-019',
              week: 'Нечетная',
              createdAt: '2024-05-21T06:11:18.656Z',
              updatedAt: '2024-05-21T06:11:18.656Z',
              time: {
                id: 4,
                startHour: '13',
                startMinutes: '45',
                endHour: '15',
                endMinutes: '20',
                createdAt: '2024-05-21T06:10:41.098Z',
                updatedAt: '2024-05-21T06:10:41.098Z',
              },
            },
            {
              id: 25664,
              name: 'Основы мультимедийных технологий',
              type: 'Лабораторные работы',
              teacher: 'Барабанова Н. В.',
              classroom: 'а.634 (К.1)',
              weekday: 'Понедельник',
              group: 'РТ-11',
              week: 'Четная',
              createdAt: '2024-05-21T06:11:18.657Z',
              updatedAt: '2024-05-21T06:11:18.657Z',
              time: {
                id: 5,
                startHour: '15',
                startMinutes: '35',
                endHour: '17',
                endMinutes: '10',
                createdAt: '2024-05-21T06:10:41.098Z',
                updatedAt: '2024-05-21T06:10:41.098Z',
              },
            },
            {
              id: 25666,
              name: 'Электроника и схемотехника',
              type: 'Лабораторные работы',
              teacher: 'Стрельцов А. И.',
              classroom: 'а.370 (К.3)',
              weekday: 'Среда',
              group: 'ББ-28',
              week: 'Нечетная',
              createdAt: '2024-05-21T06:11:18.658Z',
              updatedAt: '2024-05-21T06:11:18.658Z',
              time: {
                id: 4,
                startHour: '13',
                startMinutes: '45',
                endHour: '15',
                endMinutes: '20',
                createdAt: '2024-05-21T06:10:41.098Z',
                updatedAt: '2024-05-21T06:10:41.098Z',
              },
            },
          ],
        },
      },
    },
    500: {
      description: 'Внутренняя ошибка сервера.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Описание ошибки.' },
            },
          },
          example: {
            error: 'An error occurred while searching for the entire schedule.',
          },
        },
      },
    },
  },
};

export default getAllLessons;
