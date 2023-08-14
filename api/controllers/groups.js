const Group = require('../models/group');

module.exports.getGroups = (req, res) => {
  Group.find()
    .then((groups) => {
      if (groups.length === 0) {
        return res.status(404).json({ message: 'Данные о группах отсутствуют' });
      }

      res.send(groups);
    })
    .catch((error) => res.status(500).json({
      message: 'Произошла ошибка при получении данных из БД',
      error: error.message,
    }));
};

module.exports.updateGroups = (req, res) => {
  const newData = req.body;

  if (!newData || Object.keys(newData).length === 0) {
    return res.status(400).json({ message: 'Не предоставлены данные для обновления' });
  }

  Group.deleteMany({})
    .catch((error) => res.status(500).json({
      message: 'Произошла ошибка при обновлении данных в БД',
      error: error.message,
    }));

  Group.insertMany(newData)
    .then((updatedData) => {
      if (updatedData.length === 0) {
        return res.status(400).json({ message: 'Документы в коллекции не найдены' });
      }

      res.json({ status: 'success', data: updatedData });
    })
    .catch((error) => res.status(500).json({
      message: 'Произошла ошибка при обновлении данных в БД',
      error: error.message,
    }));
};
