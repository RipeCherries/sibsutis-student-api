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
