const getUserByID = {
  tags: ['User'],
  description: 'Получение информацию о пользователе по его уникальному идентификатору.',
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Уникальный идентификатор пользователя.',
      required: true,
      schema: {
        type: 'number',
      },
    },
    {
      name: 'Authorization',
      in: 'header',
      description: 'JWT токен для авторизации. Формат: Bearer {token}',
      required: true,
      schema: {
        type: 'string',
      },
    },
  ],
  responses: {
    200: {
      description: 'Данные пользователя.',
      content: {
        'application/json': {
          schema: {
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
          example: {
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
        },
      },
    },
    401: {
      description: 'Отсутствует авторизация.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Описание ошибки.' },
            },
          },
          example: {
            error: 'Access token is missing.',
          },
        },
      },
    },
    403: {
      description: 'Доступ запрещён.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Описание ошибки.' },
            },
          },
          example: {
            error: 'Access is denied.',
          },
        },
      },
    },
    404: {
      description: 'Пользователь не найден.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Описание ошибки.' },
            },
          },
          example: {
            error: 'User not found.',
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
            error: 'An error occurred while searching for the user.',
          },
        },
      },
    },
  },
};

export default getUserByID;
