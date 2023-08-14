const express = require('express');
const { getLastUpdate, updateLastUpdate } = require('../controllers/lastUpdate');

const lastUpdateRouter = express.Router();

lastUpdateRouter.get('/', getLastUpdate);
lastUpdateRouter.put('/', updateLastUpdate);

module.exports = lastUpdateRouter;
