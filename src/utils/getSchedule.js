const getSchedule = (data) => {
    const result = [];

    data.forEach((element) => {
        const tmp = {
            groupName: element["Группа"],
            week: element["Неделя"] === "Нечетная" ? 1 : 0,
            weekday: element["ДеньНедели"],
            time: element["ВремяНачала"].slice(element["ВремяНачала"].indexOf(" ") + 1, element["ВремяНачала"].length),
            teacher: element["ФизическоеЛицо"].replace(/(.+) (.).+ (.).+/, "$1 $2. $3."),
            room: element["Аудитория"],
            title: element["Дисциплина"]
        }

        result.push(tmp);
    });

    return result;
}

module.exports = getSchedule;