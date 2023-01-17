const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.get('/', (req, res) => {
    res.send('Hello Memes!')
});

app.get('/about', (req, res) => res.send("<p>Jason is pretty cool guy, doesn't afraid of anything.</p>"));