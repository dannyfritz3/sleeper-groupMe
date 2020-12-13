const express = require('express');
const app = express();
const port = 8080;

app.set('port', process(process.env.PORT || port ));
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(app.get('port'), function () {
    console.log(`App running on http://localhost:${port}`);
});