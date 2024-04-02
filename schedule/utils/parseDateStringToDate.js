function parseDateStringToDate(dateString) {
  const [day, month, year, time] = dateString.split(/[.\s:]/);

  const monthIndex = parseInt(month, 10) - 1;

  return new Date(year, monthIndex, day, ...time.split(':').map(Number));
}

module.exports = { parseDateStringToDate };
