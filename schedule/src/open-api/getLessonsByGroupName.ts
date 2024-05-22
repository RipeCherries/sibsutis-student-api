const getLessonsByGroupName = {
  tags: ['Lesson'],
  description: 'Получение информации о расписании группы по её названию.',
  parameters: [
    {
      name: 'groupName',
      in: 'path',
      description: 'Название группы.',
      required: true,
      schema: {
        type: 'string',
      },
    },
  ],
  responses: {
    200: {
      description: 'Расписание занятий группы.',
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
              id: 29643,
              name: 'Теория информации',
              type: 'Лекционные занятия',
              teacher: 'Мачикина Е. П.',
              classroom: 'а.210 (К.1)',
              weekday: 'Вторник',
              group: 'ИП-016',
              week: 'Четная',
              createdAt: '2024-05-21T06:11:19.919Z',
              updatedAt: '2024-05-21T06:11:19.919Z',
              time: {
                id: 1,
                startHour: '08',
                startMinutes: '00',
                endHour: '09',
                endMinutes: '35',
                createdAt: '2024-05-21T06:10:41.098Z',
                updatedAt: '2024-05-21T06:10:41.098Z',
              },
            },
            {
              id: 29649,
              name: 'Теория информации',
              type: 'Лекционные занятия',
              teacher: 'Мачикина Е. П.',
              classroom: 'а.210 (К.1)',
              weekday: 'Вторник',
              group: 'ИП-016',
              week: 'Нечетная',
              createdAt: '2024-05-21T06:11:19.921Z',
              updatedAt: '2024-05-21T06:11:19.921Z',
              time: {
                id: 1,
                startHour: '08',
                startMinutes: '00',
                endHour: '09',
                endMinutes: '35',
                createdAt: '2024-05-21T06:10:41.098Z',
                updatedAt: '2024-05-21T06:10:41.098Z',
              },
            },
            {
              id: 16880,
              name: 'Современные технологии программирования 2',
              type: 'Лекционные занятия',
              teacher: 'Зайцев М. Г.',
              classroom: 'а.210 (К.1)',
              weekday: 'Суббота',
              group: 'ИП-016',
              week: 'Нечетная',
              createdAt: '2024-05-21T06:11:16.332Z',
              updatedAt: '2024-05-21T06:11:16.332Z',
              time: {
                id: 1,
                startHour: '08',
                startMinutes: '00',
                endHour: '09',
                endMinutes: '35',
                createdAt: '2024-05-21T06:10:41.098Z',
                updatedAt: '2024-05-21T06:10:41.098Z',
              },
            },
          ],
        },
      },
    },
    404: {
      description: 'Расписание занятий группы не найдено.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Описание ошибки.' },
            },
          },
          example: {
            error: 'Lessons not found.',
          },
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
            error: 'An error occurred while searching for the group schedule.',
          },
        },
      },
    },
  },
};

export default getLessonsByGroupName;
