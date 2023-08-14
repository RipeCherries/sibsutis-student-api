const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: [true, 'Поле groupName должно быть заполнено!'],
  },
  groupId: {
    type: Number,
    required: [true, 'Поле groupId должно быть заполнено!'],
  },
}, {
  versionKey: false
});

const Group = mongoose.model('Group', groupSchema, 'groups');

module.exports = Group;
