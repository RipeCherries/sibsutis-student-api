const getGroupByID = {
  tags: ['Group'],
  description: 'Получение информации о группе по её уникальному идентификатору.',
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Уникальный идентификатор группы.',
      required: true,
      schema: {
        type: 'number',
      },
    },
  ],
  responses: {
    200: {
      description: 'Данные группы.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'number', description: 'Уникальный идентификатор группы.' },
              name: { type: 'string', description: 'Название группы.' },
              status: { type: 'string', description: 'Статус группы (активна | не активна).' },
              createdAt: { type: 'string', description: 'Временная метка создания записи.' },
              updatedAt: { type: 'string', description: 'Временная метка последнего обновления записи.' },
            },
          },
          example: {
            id: 1,
            firstname: 'ИП-016',
            status: 'active',
            createdAt: '2024-04-19T03:38:27.246Z',
            updatedAt: '2024-04-19T03:38:27.246Z',
          },
        },
      },
    },
    404: {
      description: 'Группа не найдена.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Описание ошибки.' },
            },
          },
          example: {
            error: 'Group not found.',
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
            error: 'An error occurred while receiving data about a group.',
          },
        },
      },
    },
  },
};

export default getGroupByID;
