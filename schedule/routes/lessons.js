const express = require('express');
const { getLessons, getLessonsByGroupId, updateLessons } = require('../controllers/lessons');
const checkAuthAdmin = require('../middlewares/authAdmin');
const checkAuthAppliction = require('../middlewares/authApplication');

const lessonsRouter = express.Router();

lessonsRouter.get('/', checkAuthAppliction, getLessons);
lessonsRouter.put('/', checkAuthAdmin, updateLessons);
lessonsRouter.get('/:groupId', checkAuthAppliction, getLessonsByGroupId);

module.exports = lessonsRouter;
