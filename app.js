const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

const url = "https://api.sleeper.app/v1/league/575392779379286016"
var sleeperResponse = await axios.get(url);

app.get('/', (req, res) => res.json(sleeperResponse));

app.listen(port, function () {
    console.log(`App running on http://localhost:${port}`);
});