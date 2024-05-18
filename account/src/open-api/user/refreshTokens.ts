const refreshTokens = {
  tags: ['User'],
  description: 'Обновление JWT токенов.',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: { type: 'string', description: 'Refresh токен.' },
          },
          required: ['token'],
        },
        examples: {
          Пример: {
            value: {
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTcxMzQ5NzkwNywiZXhwIjoxNzE0MTAyNzA3fQ.mJUMCSVEyySGydmnTFG6x3H4sxk0yUJb21IUKN81D6U',
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Успешное обновление токенов.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              accessToken: { type: 'string', description: 'Токен доступа.' },
              refreshToken: { type: 'string', description: 'Токен обновления.' },
            },
          },
          example: {
            accessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTcxMzQ5NzkwNywiZXhwIjoxNzEzNTAxNTA3fQ.TEzHqdFX7_5PELstRe_VI-vzHoZe5T7Xs40mw8WPO-c',
            refreshToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTcxMzQ5NzkwNywiZXhwIjoxNzE0MTAyNzA3fQ.mJUMCSVEyySGydmnTFG6x3H4sxk0yUJb21IUKN81D6U',
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
            error: 'Invalid token.',
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
            error: 'An error occurred while updating tokens.',
          },
        },
      },
    },
  },
};

export default refreshTokens;
