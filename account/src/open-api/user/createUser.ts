const createUser = {
  tags: ['User'],
  description: 'Создание нового пользователя на основе предоставленных данных.',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            firstname: { type: 'string', description: 'Имя пользователя.' },
            lastname: { type: 'string', description: 'Фамилия пользователя.' },
            email: { type: 'string', format: 'email', description: 'Адрес электронной почты пользователя.' },
            password: { type: 'string', description: 'Пароль пользователя.' },
            groupID: { type: 'number', description: 'Идентификатор группы, к которой привязан пользователь.' },
          },
          required: ['firstname', 'lastname', 'email', 'password', 'groupID'],
        },
        examples: {
          Пример: {
            value: {
              firstname: 'Иван',
              lastname: 'Иванов',
              email: 'ivanivanov@example.ru',
              password: 'password123',
              groupID: 1,
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Данные нового пользователя, а также access и refresh токены.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              user: {
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
              accessToken: { type: 'string', description: 'Токен доступа.' },
              refreshToken: { type: 'string', description: 'Токен обновления.' },
            },
          },
          example: {
            user: {
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
    409: {
      description: 'Пользователь уже существует.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Описание ошибки.' },
            },
          },
          example: {
            error: 'User already exists.',
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
            error: 'An error occurred when creating a user.',
          },
        },
      },
    },
  },
};

export default createUser;
