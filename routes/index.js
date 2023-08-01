const express = require('express');
const groupsRouter = require('./groups');
const lastUpdateRouter = require('./lastUpdate');
const startOfSemesterRouter = require('./startOfSemeseter');
const lessonsRouter = require('./lessons');

const router = express.Router();

router.use('/groups', groupsRouter);
router.use('/last-update', lastUpdateRouter);
router.use('/start-of-semester', startOfSemesterRouter);
router.use('/lessons', lessonsRouter);

module.exports = router;
