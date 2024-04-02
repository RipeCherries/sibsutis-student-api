const Group = require('../models/group');

module.exports.getGroups = (req, res) => {
  Group.find()
    .then((groups) => {
      if (groups.length === 0) {
        return res.status(404).json({ message: 'Данные о группах отсутствуют' });
      }

      res.send(groups);
    })
    .catch((error) =>
      res.status(500).json({
        message: 'Произошла ошибка при получении данных из БД',
        error: error.message,
      }),
    );
};

module.exports.updateGroups = async (newGroups) => {
  try {
    await Group.deleteMany({});

    const updatedData = await Group.insertMany(newGroups);

    if (updatedData.length === 0) {
      console.log('Документы в коллекции не найдены');
    } else {
      console.log('Данные о группах успешно обновлены');
    }
  } catch (error) {
    console.log('Произошла ошибка при обновлении данных в БД: ', error.message);
  }
};
