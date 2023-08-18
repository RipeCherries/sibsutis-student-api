const express = require('express');
const { getLessons, getLessonsByGroupId, updateLessons } = require('../controllers/lessons');
const checkAuthAdmin = require('../middlewares/authAdmin');

const lessonsRouter = express.Router();

lessonsRouter.get('/', getLessons);
lessonsRouter.put('/', checkAuthAdmin, updateLessons);
lessonsRouter.get('/:groupId', getLessonsByGroupId);

module.exports = lessonsRouter;
