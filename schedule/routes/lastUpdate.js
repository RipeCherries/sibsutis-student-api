const express = require('express');
const { getLastUpdate, updateLastUpdate } = require('../controllers/lastUpdate');
const checkAuthAdmin = require('../middlewares/authAdmin');
const checkAuthAppliction = require('../middlewares/authApplication');

const lastUpdateRouter = express.Router();

lastUpdateRouter.get('/', checkAuthAppliction, getLastUpdate);
lastUpdateRouter.put('/', checkAuthAdmin, updateLastUpdate);

module.exports = lastUpdateRouter;
