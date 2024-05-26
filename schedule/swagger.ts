import updateLessons from './src/open-api/updateLessons';
import getLessonsByGroupName from './src/open-api/getLessonsByGroupName';
import getAllLessons from './src/open-api/getAllLessons';

const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Микросервис «Schedule» | SIBSUTIS-STUDENT-API',
    description: 'Микросервис «Schedule» представляет собой часть системы, отвечающую за манипуляции с расписанием занятий. С помощью этого микросервиса можно получать актуальное расписание занятий и обновлять его.',
    termsOfService: '',
    contact: {
      name: 'Egoshin Alexey Anatolyevich',
      email: 'alexeyegoshin0403@mail.ru',
      url: 'https://github.com/RipeCherries',
    },
  },
  tags: [
    { name: 'Lesson' },
  ],
  paths: {
    '/lessons': {
      put: updateLessons,
      get: getAllLessons,
    },
    '/lessons/{groupName}': {
      get: getLessonsByGroupName,
    },
  },
};

export default swaggerDocument;