const Lesson = require('../models/lesson');

module.exports.getLessons = (req, res) => {
  Lesson.find()
    .then((lessons) => {
      if (lessons.length === 0) {
        return res.status(404).json({ message: 'Данные о занятиях отсутствуют' });
      }

      res.send(lessons);
    })
    .catch((error) => res.status(500).json({
      message: 'Произошла ошибка при получении данных из БД',
      error: error.message,
    }));
};

module.exports.updateLessons = (req, res) => {
  const newData = req.body;

  if (!newData || Object.keys(newData).length === 0) {
    return res.status(400).json({ message: 'Не предоставлены данные для обновления' });
  }

  Lesson.deleteMany({})
    .catch((error) => res.status(500).json({
      message: 'Произошла ошибка при обновлении данных в БД',
      error: error.message,
    }));

  Lesson.insertMany(newData)
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

module.exports.getLessonsByGroupId = (req, res) => {
  const targetGroupId = req.params.groupId;

  Lesson.find({ groupId: targetGroupId })
    .then((lessons) => {
      if (lessons.length === 0) {
        return res.status(404).json({ message: `Данные о занятиях группы с ID ${targetGroupId} отсутствуют` });
      }
      res.send(lessons);
    })
    .catch((error) => res.status(500).json({
      message: 'Произошла ошибка при получении данных из БД',
      error: error.message,
    }));
};
