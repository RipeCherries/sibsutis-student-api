const express = require('express');
const { getGroups, updateGroups } = require('../controllers/groups');

const groupsRouter = express.Router();

groupsRouter.get('/', getGroups);
groupsRouter.put('/', updateGroups);

module.exports = groupsRouter;
