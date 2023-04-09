/*

    ==================================
    |      ╔═╗╦╔╗ ╔═╗╦ ╦╔╦╗╦╔═╗      |
    |      ╚═╗║╠╩╗╚═╗║ ║ ║ ║╚═╗      |
    |      ╚═╝╩╚═╝╚═╝╚═╝ ╩ ╩╚═╝      |
    |    ╔═╗╔═╗╦ ╦╔═╗╔╦╗╦ ╦╦  ╔═╗    |
    |    ╚═╗║  ╠═╣║╣  ║║║ ║║  ║╣     |
    |    ╚═╝╚═╝╩ ╩╚═╝═╩╝╚═╝╩═╝╚═╝    |
    |            ╔═╗╔═╗╦             |
    |            ╠═╣╠═╝║             |
    |            ╩ ╩╩  ╩             |
    ==================================
    Authors:
    @ Egoshin Alexey        (https://github.com/RipeCherries)
    @ Nikolaev Vladislav    (https://github.com/Vl1ts)

*/

/* --- Importing libraries --- */
const express = require("express");
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const fs = require("fs");


/* --- Importing custom functions --- */
const getAllGroups = require("./src/utils/getAllGroups");
const getSchedule = require("./src/utils/getSchedule");


/* --- Creating an API application --- */
const app = express();

// limitation on the size of transmitted data
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));


/* --- Authorization --- */
const auth = basicAuth({
    users: { 'admin': 'admin' },
    challenge: true
})


/* --- API endpoint`s --- */
// common (main) URL:
app.get("/", (req, res) => {
    res.send("API for the SibSUTIS University schedule mobile application. " +
        "Go to the URL /admin to enter the admin panel.");
})

// admin URL:
app.get("/admin", auth, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

// schedule update URL:
app.post("/api/scheduleUpload", auth, (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }


    const groupsData = getAllGroups(req.body);
    fs.writeFileSync("./src/data/allGroups.json", JSON.stringify(groupsData));

    const scheduleData = getSchedule(req.body);
    fs.writeFileSync("./src/data/schedule.json", JSON.stringify(scheduleData));


    const d = new Date();
    const tmp = {
        date: d.getTime()
    }

    fs.writeFileSync("./src/data/date.json", JSON.stringify(tmp));

    return res.sendStatus(200);
});

// get list of group name`s URL:
app.get("/api/allGroups", (req, res) => {
    const data = fs.readFileSync("./src/data/allGroups.json", "utf8");
    const groups = JSON.parse(data);
    res.send(groups);
});

// get schedule URL:
app.get("/api/schedule", (req, res) => {
    const data = fs.readFileSync("./src/data/schedule.json", "utf8");
    const schedule = JSON.parse(data);
    res.send(schedule);
});

// get last update date URL:
app.get("/api/lastUpdate", (req, res) => {
    const data = fs.readFileSync("./src/data/date.json", "utf8");
    const date = JSON.parse(data);
    res.send(date);
})


/* --- Start app --- */
app.listen(3000, () => {
    console.log("The server is waiting for connection");
})