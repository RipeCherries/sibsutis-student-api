const getAllGroups = (data) => {
    const unique = [];

    data.forEach((element) => {
        if (unique.indexOf(element["Группа"]) === -1) {
            unique.push(element["Группа"])
        }
    });

    return unique;
}

module.exports = getAllGroups;