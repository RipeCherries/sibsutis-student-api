const getAllUsers = {
  tags: ['User'],
  description: 'Получение информации обо всех пользователях.',
  responses: {
    200: {
      description: 'Данные пользователей.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', description: 'Уникальный идентификатор пользователя.' },
                firstname: { type: 'string', description: 'Имя пользователя.' },
                lastname: { type: 'string', description: 'Фамилия пользователя.' },
                email: { type: 'string', format: 'email', description: 'Адрес электронной почты пользователя.' },
                group: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', description: 'Уникальный идентификатор группы.' },
                    name: { type: 'string', description: 'Название группы.' },
                    status: { type: 'string', description: 'Статус группы (active | inactive).' },
                    createdAt: { type: 'string', description: 'Временная метка создания записи.' },
                    updatedAt: { type: 'string', description: 'Временная метка последнего обновления записи.' },
                  },
                },
                createdAt: { type: 'string', description: 'Временная метка создания записи.' },
                updatedAt: { type: 'string', description: 'Временная метка последнего обновления записи.' },
              },
            },
          },
          example: [
            {
              id: 1,
              firstname: 'Иван',
              lastname: 'Иванов',
              email: 'ivanivanov@example.ru',
              group: {
                id: 1,
                name: 'ТТ-33',
                status: 'active',
                createdAt: '2024-04-19T03:38:27.246Z',
                updatedAt: '2024-04-19T03:38:27.246Z',
              },
              createdAt: '2024-04-19T03:38:27.246Z',
              updatedAt: '2024-04-19T03:38:27.246Z',
            },
            {
              id: 2,
              firstname: 'Петр',
              lastname: 'Николаев',
              email: 'petrnikolaev@example.ru',
              group: {
                id: 1,
                name: 'ТТ-33',
                status: 'active',
                createdAt: '2024-04-19T03:38:27.246Z',
                updatedAt: '2024-04-19T03:38:27.246Z',
              },
              createdAt: '2024-04-19T03:38:27.246Z',
              updatedAt: '2024-04-19T03:38:27.246Z',
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
            error: 'An error occurred while receiving user data.',
          },
        },
      },
    },
  },
};

export default getAllUsers;
