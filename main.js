const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');
const { request, response } = require("express");

const getAllGroups = require("./src/utils/getAllGroups");

const app = express();
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const jsonParser = express.json();

/* --- API ENDPOINT`S --- */
app.get("/api/allGroups", function(request, response) {
    const data = fs.readFileSync("./src/data/allGroups.json","utf8");
    const groups = JSON.parse(data);
    response.send(groups);
});

app.post("/api/scheduleUpload", jsonParser, (request, response) => {
   if (!request.body) {
       return response.sendStatus(400);
   }

   const data = getAllGroups(request.body);

   fs.writeFileSync("./src/data/allGroups.json", JSON.stringify(data));

   return response.sendStatus(200);
});

app.listen(3000, () => {
    console.log("The server is waiting for connection");
})