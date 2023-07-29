const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groups: {
    type: [String],
    required: [true, 'Поле groups должно быть заполнено!'],
  },
});

const Group = mongoose.model('Group', groupSchema, 'groups');

module.exports = Group;
