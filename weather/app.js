const { OpenWeatherAPI } = require("openweather-api-node")

let weather = new OpenWeatherAPI({
    key: "446796dd3dcb7353a6708022dc53b51a",
    locationName: "New York",
    units: "imperial"
});

weather.getCurrent().then(data => {
    console.log(`Current temperature in New York is: ${data.weather.temp.cur}\u00B0F`)
})

