const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

const url = "https://api.sleeper.app/v1/league/575392779379286016"
var sleeperResponse;

axios.get(url).then((response) => {
    sleeperResponse = response;
}, (error) => {
    sleeperResponse = error;
});

app.get('/', (req, res) => res.send(sleeperResponse));

app.listen(port, function () {
    console.log(`App running on http://localhost:${port}`);
});