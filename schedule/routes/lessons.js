const express = require('express');
const { getLessons, getLessonsByGroupId, updateLessons } = require('../controllers/lessons');

const lessonsRouter = express.Router();

lessonsRouter.get('/', getLessons);
lessonsRouter.put('/', updateLessons);
lessonsRouter.get('/:groupId', getLessonsByGroupId);

module.exports = lessonsRouter;
