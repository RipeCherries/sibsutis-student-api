import express from 'express';
import GroupController from '../controllers/groupController';

const router: express.Router = express.Router();
const controller: GroupController = new GroupController();

// Обновление данных о группах
router.put('/groups', controller.updateGroups.bind(controller));

// Получение информации о группе по ID
router.get('/group/:id', controller.getGroupByID.bind(controller));

// Получение информации об актуальных группах
router.get('/groups', controller.getAllGroups.bind(controller));

export default router;
