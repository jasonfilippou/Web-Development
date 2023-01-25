const { OpenWeatherAPI } = require("openweather-api-node");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/views/index.html"));
});

app.post("/weather/public", (req, res) => {
  let city = req.body.city;
  let units = (req.body.units || "").trim().toUpperCase();
  if (!["IMPERIAL", "METRIC", "STANDARD"].includes(units)) {
    res.sendFile(path.join(__dirname, "/public/views/error.html"));
    return;
  }

  let weather = new OpenWeatherAPI({
    key: "446796dd3dcb7353a6708022dc53b51a",
    locationName: city,
    units: units,
  });
  weather.getCurrent().then((data) => {
    res.send(
      `<p>Current temperature in ${city} is: ${data.weather.temp.cur}</p>`
    );
  });
});
