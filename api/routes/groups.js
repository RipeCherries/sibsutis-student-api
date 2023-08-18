const express = require('express');
const { getGroups, updateGroups } = require('../controllers/groups');
const checkAuthAdmin = require('../middlewares/authAdmin');

const groupsRouter = express.Router();

groupsRouter.get('/', checkAuthAdmin, getGroups);
groupsRouter.put('/', updateGroups);

module.exports = groupsRouter;
