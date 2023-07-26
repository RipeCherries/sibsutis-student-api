require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB_PATH } = require('./utils/config');

const app = express();

mongoose
  .connect(DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => console.log('Подключение к базе данных: Успешно!'))
  .catch((err) => console.log('Подключение к базе данных: Неудачно!', err));

app.listen(PORT, () => console.log(`API запущено на порту ${PORT}`));
