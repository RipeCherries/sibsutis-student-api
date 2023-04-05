function getAllGroups(file) {
    // console.log(file);

    const unique = [];

    file.forEach((element) => {
        if (unique.indexOf(element["Группа"]) === -1) {
            unique.push(element["Группа"])
        }
    });

    return unique;
}

module.exports = getAllGroups;