import {extractTime} from "./extractTime";

export const formatLessons = (data, groups) => {
    const result = [];

    data.forEach((element) => {
        const tmp = {
            groupName: element['Группа'],
            groupId: groups.find(group => group.groupName === element['Группа']).groupId,
            week: element['Неделя'] === 'Нечетная' ? 1 : 0,
            weekday: element['ДеньНедели'],
            time: extractTime(element['ВремяНачала']),
            teacher: element['ФизическоеЛицо'].replace(/(.+) (.).+ (.).+/, '$1 $2. $3.'),
            room: element['Аудитория'],
            name: element['Дисциплина'],
        };

        result.push(tmp);
    });

    return result;
}