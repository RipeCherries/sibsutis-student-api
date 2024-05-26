const getAllGroups = {
  tags: ['Group'],
  description: 'Получение информации обо всех активных группах.',
  responses: {
    200: {
      description: 'Данные групп.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', description: 'Уникальный идентификатор группы.' },
                name: { type: 'string', description: 'Название группы.' },
                status: { type: 'string', description: 'Статус группы (активна | не активна).' },
                createdAt: { type: 'string', description: 'Временная метка создания записи.' },
                updatedAt: { type: 'string', description: 'Временная метка последнего обновления записи.' },
              },
            },
          },
          example: [
            {
              id: 1,
              firstname: 'ИП-016',
              status: 'active',
              createdAt: '2024-04-19T03:38:27.246Z',
              updatedAt: '2024-04-19T03:38:27.246Z',
            },
            {
              id: 2,
              firstname: 'ИП-816',
              status: 'inactive',
              createdAt: '2024-01-19T03:38:27.246Z',
              updatedAt: '2024-01-19T03:38:27.246Z',
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
            error: 'An error occurred while getting data about current groups.',
          },
        },
      },
    },
  },
};

export default getAllGroups;
