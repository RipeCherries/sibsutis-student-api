const express = require('express');
const groupsRouter = require('./groups');
const lastUpdateRouter = require('./lastUpdate');
const startOfSemesterRouter = require('./startOfSemeseter');
const lessonsRouter = require('./lessons');
const notifyUpdateRouter = require('./notifyUpdate')

const router = express.Router();

router.use('/groups', groupsRouter);
router.use('/last-update', lastUpdateRouter);
router.use('/start-of-semester', startOfSemesterRouter);
router.use('/lessons', lessonsRouter);
router.use('/notify-update', notifyUpdateRouter);

module.exports = router;
