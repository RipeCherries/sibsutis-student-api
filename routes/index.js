const express = require('express');
const groupsRouter = require('./groups');
const lastUpdateRouter = require('./lastUpdate');

const router = express.Router();

router.use('/groups', groupsRouter);
router.use('/last-update', lastUpdateRouter);

module.exports = router;
