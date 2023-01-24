const { OpenWeatherAPI } = require("openweather-api-node")
const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

app.get("/", (req, res) => {
    res.send("Serving GET request at root route.");
});

let weather = new OpenWeatherAPI({
    key: "446796dd3dcb7353a6708022dc53b51a",
    locationName: "New York",
    units: "imperial"
});

weather.getCurrent().then(data => {
    console.log(`Current temperature in New York is: ${data.weather.temp.cur}\u00B0F`)
})

