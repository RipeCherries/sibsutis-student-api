const express = require('express');
const { getLessons, getLessonsByGroupId } = require('../controllers/lessons');

const lessonsRouter = express.Router();

lessonsRouter.get('/', getLessons);
lessonsRouter.get('/:groupId', getLessonsByGroupId);

module.exports = lessonsRouter;
