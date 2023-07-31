const mongoose = require('mongoose');

const startOfSemesterSchema = new mongoose.Schema({
  date: {
    type: Number,
    required: [true, 'Поле date должно быть заполнено!'],
  },
});

const StartOfSemester = mongoose.model('StartOfSemester', startOfSemesterSchema, 'start-of-semester');

module.exports = StartOfSemester;
