import express from 'express';
import UserController from '../controllers/userController';
import verifyAccessToken from '../middlewares/authMiddleware';

const router: express.Router = express.Router();
const controller: UserController = new UserController();

// Регистрация пользователя
router.post('/create-user', controller.createUser.bind(controller));

// Авторизация пользователя
router.post('/login', controller.loginUser.bind(controller));

// Получение информации о пользователе по ID
router.get('/user/:id', verifyAccessToken, controller.getUserByID.bind(controller));

// Удаление пользователя
router.delete('/user/:id', verifyAccessToken, controller.deleteUser.bind(controller));

// Обновление данных пользователя
router.put('/user/:id', verifyAccessToken, controller.updateUser.bind(controller));

// Смена пароля пользователя
router.put('/change-password/:id', verifyAccessToken, controller.updateUserPassword.bind(controller));

// Получение информации обо всех пользователях
router.get('/users', controller.getAllUsers.bind(controller));

// Обновление токенов
router.post('/refresh', controller.refreshTokens.bind(controller));

export default router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImVtYWlsIjoiaXZhbml2YW5vdkBleGFtcGxlLnJ1IiwiaWF0IjoxNzE2MDA4NjEyLCJleHAiOjE3MTYwMDg5MTJ9.rund9RJbcyANipn85bUq1VZFC17k9vKdYmFtSgNLCXo