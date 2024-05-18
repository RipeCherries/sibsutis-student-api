const deleteUser = {
  tags: ['User'],
  description: 'Удаление пользователя по его уникальному идентификатору.',
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
    204: {
      description: 'Успешное удаление пользователя.',
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
              error: {
                type: 'string',
                description: 'Описание ошибки.',
              },
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
              error: {
                type: 'string',
                description: 'Описание ошибки.',
              },
            },
          },
          example: {
            error: 'An error occurred while deleting the user.',
          },
        },
      },
    },
  },
};

export default deleteUser;
