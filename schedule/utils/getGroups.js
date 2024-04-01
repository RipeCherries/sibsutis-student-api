function getGroups(data) {
    const groupsMap = new Map();

    data.forEach((element) => {
        const groupName = element['GROUP'];

        if (!groupsMap.has(groupName)) {
            const groupId = groupsMap.size + 1;
            groupsMap.set(groupName, { groupName, groupId });
        }
    });

    return Array.from(groupsMap.values());
}

module.exports = { getGroups };
