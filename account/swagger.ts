import * as Documentation from './src/open-api';

const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Микросервис «Account» | SIBSUTIS-STUDENT-API',
    description: 'Микросервис «Account» представляет собой часть системы, отвечающую за манипуляции с пользователями. С помощью этого микросервиса можно создавать, обновлять, просматривать и удалять учётные данные пользователей, а также получать информацию о них.',
    termsOfService: '',
    contact: {
      name: 'Egoshin Alexey Anatolyevich',
      email: 'alexeyegoshin0403@mail.ru',
      url: 'https://github.com/RipeCherries',
    },
  },
  tags: [
    {
      name: 'User',
    },
    {
      name: 'Group',
    },
  ],
  paths: {
    '/create-user': {
      post: Documentation.createUser,
    },
    '/login': {
      post: Documentation.loginUser,
    },
    '/user/{id}': {
      get: Documentation.getUserByID,
      delete: Documentation.deleteUser,
      put: Documentation.updateUser,
    },
    '/change-password/{id}': {
      put: Documentation.updateUserPassword,
    },
    '/users': {
      get: Documentation.getAllUsers,
    },
    '/refresh': {
      post: Documentation.refreshTokens,
    },
    '/groups': {
      get: Documentation.getAllGroups,
      put: Documentation.updateGroups,
    },
    '/group/{id}': {
      get: Documentation.getGroupByID,
    },
  },
};

export default swaggerDocument;