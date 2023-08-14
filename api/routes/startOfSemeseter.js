const express = require('express');
const { getStartOfSemester, updateStartOfSemester } = require('../controllers/startOfSemester');

const startOfSemesterRouter = express.Router();

startOfSemesterRouter.get('/', getStartOfSemester);
startOfSemesterRouter.put('/', updateStartOfSemester);

module.exports = startOfSemesterRouter;
