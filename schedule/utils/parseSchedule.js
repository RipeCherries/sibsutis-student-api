const { getGroups } = require('./getGroups');
const { extractTime } = require('./extractTime');

function parseSchedule(data) {
    const groups = getGroups(data);

    const result = [];

    data.forEach((element) => {
        const tmp = {
            groupName: element['GROUP'],
            groupId: groups.find((group) => group.groupName === element['GROUP']).groupId,
            week: element['WEEK'] === 'Нечетная' ? 1 : 0,
            weekday: element['WEEK_DAY'],
            time: extractTime(element['DATE_BEGIN']),
            teacher: element['TEACHER'] ? element['TEACHER'].replace(/(.+) (.).+ (.).+/, '$1 $2. $3.') : "",
            room: element['CLASSROOM'],
            name: element['DISCIPLINE'],
        };

        result.push(tmp);
    });

    return [
        result,
        groups
    ];
}

module.exports = { parseSchedule }
