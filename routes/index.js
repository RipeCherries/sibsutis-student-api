const express = require('express');
const groupsRouter = require('./groups');

const router = express.Router();

router.use('/groups', groupsRouter);

module.exports = router;
