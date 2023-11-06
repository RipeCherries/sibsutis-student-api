const express = require('express')
const checkAuthAdmin = require('../middlewares/authAdmin');
const { updateData } = require('../controllers/notifyUpdate');

const notifyUpdate = express.Router();

notifyUpdate.post('/', checkAuthAdmin, updateData)

module.exports = notifyUpdate;
