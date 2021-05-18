const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');

// The following statement allows our `body-parser` instance to access form-data.
app.use(bodyParser.urlencoded({extended:true}));

// The following statement tells Express to serve all static resources from `public` folder
// to the client. This is important because when we serve the index.html file to the user,
// their browser also needs to access linked stylesheets and `.js` files.
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log("Server spun on port 3000.")
});

app.get("/", (req, res) => {
  console.log("Serving a GET request at root route.");
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/", (req, res) => {
  console.log("Serving a POST request at root route.");
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  let MULTIPLIER = 1;
  if(req.body.measurements === "imperial") {
    MULTIPLIER = 703;
  }
  const bmi = weight / (height * height) * MULTIPLIER;
  res.send("<h3>Your BMI is: " + bmi + "</h3>");
});
