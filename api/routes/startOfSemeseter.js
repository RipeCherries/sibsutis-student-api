const express = require('express');
const { getStartOfSemester, updateStartOfSemester } = require('../controllers/startOfSemester');
const checkAuthAdmin = require('../middlewares/authAdmin');
const checkAuthAppliction = require('../middlewares/authApplication');

const startOfSemesterRouter = express.Router();

startOfSemesterRouter.get('/', checkAuthAppliction, getStartOfSemester);
startOfSemesterRouter.put('/', checkAuthAdmin, updateStartOfSemester);

module.exports = startOfSemesterRouter;
