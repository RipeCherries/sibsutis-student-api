const verifyToken = {
  tags: ['User'],
  description: 'Проверка токена доступа.',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: { type: 'string', description: 'Токен доступа.' },
          },
          required: ['token'],
        },
        examples: {
          Пример: {
            value: {
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTcxMzQ5NzkwNywiZXhwIjoxNzEzNTAxNTA3fQ.TEzHqdFX7_5PELstRe_VI-vzHoZe5T7Xs40mw8WPO-c',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Валидный токен.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', description: 'Сообщение о результате проверки токена.' },
            },
          },
          example: {
            message: 'Token is valid.',
          },
        },
      },
    },
    400: {
      description: 'Отсутствуют обязательные поля.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Описание ошибки.' },
            },
          },
          example: {
            error: 'Required fields are missing.',
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
            error: 'An error occurred while verifying the access token.',
          },
        },
      },
    },
  },
};

export default verifyToken;
