const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.json(getSleeperResponse()));

app.listen(port, function () {
    console.log(`App running on http://localhost:${port}`);
});

async function getSleeperResponse() {
    const url = "https://api.sleeper.app/v1/league/575392779379286016"
    var response = await axios.get(url);
    return response;
}