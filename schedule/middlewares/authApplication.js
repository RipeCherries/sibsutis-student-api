const { ADMIN_API_KEY, APPLICATION_API_KEY } = require('../utils/config');

module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ message: 'Отстуствует API ключ' });
  }

  if (apiKey === ADMIN_API_KEY || apiKey === APPLICATION_API_KEY) {
    next();
  } else {
    res.status(403).json({ message: 'Доступ запрещён' });
  }
};
