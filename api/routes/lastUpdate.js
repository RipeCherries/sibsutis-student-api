const express = require('express');
const { getLastUpdate, updateLastUpdate } = require('../controllers/lastUpdate');
const checkAuthAdmin = require('../middlewares/authAdmin');

const lastUpdateRouter = express.Router();

lastUpdateRouter.get('/', checkAuthAdmin, getLastUpdate);
lastUpdateRouter.put('/', updateLastUpdate);

module.exports = lastUpdateRouter;
