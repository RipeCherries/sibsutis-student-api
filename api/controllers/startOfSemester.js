const StartOfSemester = require('../models/startOfSemester');

module.exports.getStartOfSemester = (req, res) => {
  StartOfSemester.find()
    .then((startOfSemester) => {
      if (startOfSemester.length === 0) {
        return res.status(404).json({ message: 'Данные о начале семестра отсутствуют' });
      }

      res.send(startOfSemester[0]);
    })
    .catch((error) => res.status(500).json({
      message: 'Произошла ошибка при получении данных из БД',
      error: error.message,
    }));
};

module.exports.updateStartOfSemester = (req, res) => {
  const newData = req.body;

  if (!newData || Object.keys(newData).length === 0) {
    return res.status(400).json({ message: 'Не предоставлены данные для обновления' });
  }

  StartOfSemester.findOneAndUpdate({}, newData, { new: true })
    .then((updatedData) => {
      if (updatedData.length === 0) {
        return res.status(400).json({ message: 'Документ в коллекции не найден' });
      }

      res.json({ status: 'success', data: updatedData });
    })
    .catch((error) => res.status(500).json({
      message: 'Произошла ошибка при обновлении данных в БД',
      error: error.message,
    }));
};
