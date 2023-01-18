const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.listen(port, () => console.log(`App listening on port ${port}.`));

app.get("/", (req, res) => {
    //res.send('<p>Responding to a GET /</p>');
    res.sendFile(__dirname + '/views/index.html')
});