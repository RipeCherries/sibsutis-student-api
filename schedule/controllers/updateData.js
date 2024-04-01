const axios = require('axios');
const FormData = require('form-data');

const { EXTERNAL_API_URL } = require('../utils/config');
const { parseDateStringToDate } = require('../utils/parseDateStringToDate');
const { parseSchedule } = require('../utils/parseSchedule');
const Token = require('../models/token');
const LastUpdate = require('../models/lastUpdate');
const { updateLessons } = require('./lessons');
const { updateGroups } = require('./groups');
const { updateLastUpdate } = require('./lastUpdate');


async function refreshTokens() {
    try {
        const { refreshToken } = await Token.findOne({});

        const formData = new FormData();
        formData.append('token', refreshToken);

        const response = await axios({
            method: "post",
            url: EXTERNAL_API_URL + "/update_tokens/",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (response.data && response.status === 200) {
            await Token.updateOne({}, {
                accessToken: response.data["access_token"],
                refreshToken: response.data["refresh_token"]
            });
        }
    } catch (error) {
        console.log("Ошибка при обновлении токенов: ", error.message)
    }
}

async function updateDataFromExternalAPI() {
    try {
        const { accessToken } = await Token.findOne({});

        const formData = new FormData();
        formData.append('token', accessToken);

        const response = await axios({
            method: "post",
            url: EXTERNAL_API_URL + "/get_plan_schedule/",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        const data = response.data["schedule"];

        const [ lessons, groups ] = parseSchedule(data);

        await updateGroups(groups);
        await updateLessons(lessons);
    } catch (error) {
        console.log(error.message);
    }
}

async function checkUpdateFromExternalAPI() {
    try {
        const { accessToken } = await Token.findOne({});

        const formData = new FormData();
        formData.append('token', accessToken);

        const response = await axios({
            method: "post",
            url: EXTERNAL_API_URL + "/get_last_update_schedule/",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (response.data && response.data["status_code"] === 401) {
            throw new Error(response.data.msg);
        }

        const lastUpdateDate = parseDateStringToDate(response.data["last_date_update"]);

        const lastUpdateInDB = await LastUpdate.findOne({});

        if (lastUpdateInDB["date"] < lastUpdateDate) {
            await updateDataFromExternalAPI();
            await updateLastUpdate({ date: lastUpdateDate });
        }
    } catch (error) {
        console.error('Ошибка при запросе данных:', error.message);
        await refreshTokens().then(async () => {
                await updateDataFromExternalAPI();
            }
        );
    }
}

module.exports = { checkUpdateFromExternalAPI };
