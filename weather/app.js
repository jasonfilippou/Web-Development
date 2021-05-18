const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

// Listen on port 3000.
app.listen(3000, () => {
  console.log("Server running on port 3000.");
});

// Serve all static resources inside `public` directory.
app.use(express.static(path.join(__dirname, 'public')));

// The following statement allows our `body-parser` instance to access form-data.
app.use(bodyParser.urlencoded({extended:true}));

// Root GET endpoint. Serve them with an HTML view.
app.get("/", (req, res) => {
  console.log("Serving a GET request at root route.");
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Root POST endpoint. We will serve weather data using it.
app.post("/", (requestFromClient, responseToClient) => {
  console.log("Serving a POST request at root route.");
  // Contact OpenWeatherMap API for weather data once the user gives us some query parameters.
  //body-parser helps us tap into the client request's body.
  const apiKey = requestFromClient.body.apiKey;
  const units = requestFromClient.body.units;
  const city = requestFromClient.body.city;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  https.get(URL, (responseFromAPI) => {
    console.log(`Contacting OpenWeatherMap API yielded response code: ${responseFromAPI.statusCode}.`);
    // Parse the data from the server.
    responseFromAPI.on("data", (data) => {
      const weatherData = JSON.parse(data);
      // Destructuring assingment only possible with `let`. Doesn't seem as clean as with Python.
      let description, temperature, icon;
      [description, temperature, icon] = [weatherData.weather[0].description, weatherData.main.temp, weatherData.weather[0].icon];
      const ICON_URL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      // Send the data to the user.
      responseToClient.write(`<p>The weather in ${city} is currently ${description}.`);
      responseToClient.write(`The temperature is ${temperature} degrees ${units === "imperial" ? "Fahrenheit" : "Celcius"}.`);
      responseToClient.write(`This is what it looks like: </p> <p><img src = \"${ICON_URL}"\" alt = \"Image descriptive of weather.\"></p>`);
      responseToClient.send();
    });
  });
});
