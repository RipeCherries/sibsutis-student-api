const LastUpdate = require('../models/lastUpdate');

module.exports.getLastUpdate = (req, res) => {
  LastUpdate.find()
    .then((lastUpdate) => {
      if (lastUpdate.length === 0) {
        return res.status(404).json({ message: 'Данные о последнем обновлении отсутствуют' });
      }

      res.send(lastUpdate[0]);
    })
    .catch((error) =>
      res.status(500).json({
        message: 'Произошла ошибка при получении данных из БД',
        error: error.message,
      }),
    );
};

module.exports.updateLastUpdate = async (newLastUpdate) => {
  try {
    const updatedData = await LastUpdate.findOneAndUpdate({}, newLastUpdate, { new: true });

    if (!updatedData) {
      console.log('Документы в коллекции не найдены');
    } else {
      console.log('Данные о последнем обновлении успешно обновлены');
    }
  } catch (error) {
    console.log('Произошла ошибка при обновлении данных в БД: ', error.message);
  }
};
