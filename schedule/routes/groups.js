const express = require('express');
const { getGroups, updateGroups } = require('../controllers/groups');
const checkAuthAdmin = require('../middlewares/authAdmin');
const checkAuthAppliction = require('../middlewares/authApplication');

const groupsRouter = express.Router();

groupsRouter.get('/', checkAuthAppliction, getGroups);
groupsRouter.put('/', checkAuthAdmin, updateGroups);

module.exports = groupsRouter;
