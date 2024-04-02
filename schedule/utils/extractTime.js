const endLessonsHours = {
  8: 9,
  9: 11,
  11: 13,
  13: 15,
  15: 17,
  17: 19,
  19: 20,
};

const endLessonsMinutes = {
  0: 35,
  50: 25,
  40: 15,
  45: 20,
  35: 10,
  25: 0,
  15: 50,
};

function extractTime(timeString) {
  const timeParts = timeString.split(' ');
  const time = timeParts[1];
  const [hours, minutes] = time.split(':');
  return {
    startHours: Number(hours),
    startMinutes: Number(minutes),
    endHours: endLessonsHours[Number(hours)],
    endMinutes: endLessonsMinutes[Number(minutes)],
  };
}
module.exports = { extractTime };
