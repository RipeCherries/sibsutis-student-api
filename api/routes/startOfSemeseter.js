const express = require('express');
const { getStartOfSemester, updateStartOfSemester } = require('../controllers/startOfSemester');
const checkAuthAdmin = require('../middlewares/authAdmin');

const startOfSemesterRouter = express.Router();

startOfSemesterRouter.get('/', getStartOfSemester);
startOfSemesterRouter.put('/', checkAuthAdmin, updateStartOfSemester);

module.exports = startOfSemesterRouter;
