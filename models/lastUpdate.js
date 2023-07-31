const mongoose = require('mongoose');

const lastUpdateSchema = new mongoose.Schema({
  date: {
    type: Number,
    required: [true, 'Поле date должно быть заполнено!'],
  },
});

const LastUpdate = mongoose.model('LastUpdate', lastUpdateSchema, 'last-update');

module.exports = LastUpdate;
