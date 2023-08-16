const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  groupName: {
    type: String,
    require: [true, 'Поле groupName должно быть заполнено!'],
  },
  groupId: {
    type: Number,
    require: [true, 'Поле groupId должно быть заполнено'],
  },
  week: {
    type: Number,
    require: [true, 'Поле week должно быть заполнено'],
  },
  weekday: {
    type: String,
    require: [true, 'Поле weekday должно быть заполнено'],
  },
  time: {
    startHours: {
      type: Number,
      require: [true, 'Поле startHours должно быть заполнено'],
    },
    startMinutes: {
      type: Number,
      require: [true, 'Поле startMinutes должно быть заполнено'],
    },
    endHours: {
      type: Number,
      require: [true, 'Поле endHours должно быть заполнено'],
    },
    endMinutes: {
      type: Number,
      require: [true, 'Поле endMinutes должно быть заполнено'],
    },
  },
  teacher: {
    type: String,
    require: [true, 'Поле teacher должно быть заполнено'],
  },
  room: {
    type: String,
    require: [true, 'Поле room должно быть заполнено'],
  },
  name: {
    type: String,
    require: [true, 'Поле name должно быть заполнено'],
  },
}, {
  versionKey: false,
});

const Lesson = mongoose.model('Lesson', lessonSchema, 'lessons');

module.exports = Lesson;
