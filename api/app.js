require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { PORT, DB_PATH } = require('./utils/config');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true}));

app.use(routes);
app.use('/admin', express.static(path.join(__dirname, '..', 'admin', 'build')));
app.use('/static', express.static(path.join(__dirname, '..', 'admin', 'build', 'static')));

mongoose
  .connect(DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => console.log('Подключение к базе данных: Успешно!'))
  .catch((err) => console.log('Подключение к базе данных: Неудачно!', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.listen(PORT, () => console.log(`API запущено на порту ${PORT}`));
