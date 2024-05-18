const updateUserPassword = {
  tags: ['User'],
  description: 'Обновление пароля пользователя.',
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
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            oldPassword: { type: 'string', description: 'Старый пароль пользователя.' },
            newPassword: { type: 'string', description: 'Новый пароль пользователя.' },
          },
          required: ['oldPassword', 'newPassword'],
        },
        examples: {
          Пример: {
            value: {
              oldPassword: 'password123',
              newPassword: 'qwerty123',
            },
          },
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Успешная смена пароля пользователя.',
    },
    401: {
      description: 'Неверный старый пароль.',
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
            error: 'Invalid old password.',
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
            error: 'An error occurred while updating the user\'s password.',
          },
        },
      },
    },
  },
};

export default updateUserPassword;
