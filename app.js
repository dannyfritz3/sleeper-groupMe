const express = require('express');
const app = express();
const port = 8080;
const setRoutes = require('./routes.js');

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

setRoutes(app);

app.listen(port, function () {
    console.log(`App running on http://localhost:${port}`);
});