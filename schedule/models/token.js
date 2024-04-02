const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
  {
    accessToken: {
      type: String,
      required: [true, 'Поле accessToken должно быть заполнено!'],
    },
    refreshToken: {
      type: String,
      required: [true, 'Поле refreshToken должно быть заполнено!'],
    },
  },
  {
    versionKey: false,
  },
);

const Token = mongoose.model('Token', tokenSchema, 'tokens');

module.exports = Token;
