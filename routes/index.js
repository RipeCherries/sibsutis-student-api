const express = require('express');
const groupsRouter = require('./groups');
const lastUpdateRouter = require('./lastUpdate');
const startOfSemesterRouter = require('./startOfSemeseter');

const router = express.Router();

router.use('/groups', groupsRouter);
router.use('/last-update', lastUpdateRouter);
router.use('/start-of-semester', startOfSemesterRouter);

module.exports = router;
