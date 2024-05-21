import express from 'express';
import LessonController from '../controllers/lessonController';
import verifyAccessToken from '../middlewares/authMiddleware';

const router: express.Router = express.Router();
const controller: LessonController = new LessonController();

// Обновление данных о занятиях
router.put('/lessons', controller.updateLessons.bind(controller));

// Получение расписания занятий по названию группы
router.get('/lessons/:groupName', verifyAccessToken, controller.getLessonsByGroupName.bind(controller));

// Получение всего расписания занятий
router.get('/lessons', controller.getAllLessons.bind(controller));

export default router;
