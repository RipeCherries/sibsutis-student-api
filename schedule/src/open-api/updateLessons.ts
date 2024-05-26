const updateLessons = {
  tags: ['Lesson'],
  description: 'Обновление информации о занятиях.',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            lessons: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string', description: 'Название дисциплины.' },
                  type: { type: 'string', description: 'Тип занятия.' },
                  teacher: { type: 'string', description: 'Фамилия И.О. преподавателя.' },
                  classroom: { type: 'string', description: 'Аудитория.' },
                  group: { type: 'string', description: 'Название группы.' },
                  week: { type: 'string', description: 'Чётность недели.' },
                  weekday: { type: 'string', description: 'День недели.' },
                  startHour: { type: 'string', description: 'Час начала занятия.' },
                },
                required: ['name', 'type', 'teacher', 'classroom', 'group', 'week', 'weekday', 'startHour'],
              },
            },
          },
          required: ['lessons'],
        },
        example: {
          lessons: [
            {
              name: 'Экономика',
              type: 'Практические занятия',
              teacher: 'Зуева А. В.',
              classroom: 'а.517 (К.1)',
              group: 'ТТ-33',
              week: 'Четная',
              weekday: 'Среда',
              startHour: '11',
            },
            {
              name: 'Параллельные вычислительные технологии',
              type: 'Практические занятия',
              teacher: 'Курносов М. Г.',
              classroom: 'а.408 (К.1)',
              group: 'ИВ222',
              week: 'Четная',
              weekday: 'Вторник',
              startHour: '13',
            },
          ],
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Успешное обновление данных о занятиях.',
    },
    500: {
      description: 'Внутренняя ошибка сервера.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'Описание ошибки.',
              },
            },
          },
          example: {
            error: 'An error occurred while updating lesson data.',
          },
        },
      },
    },
  },
};

export default updateLessons;
