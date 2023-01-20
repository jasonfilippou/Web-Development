const express = require("express");
const path = require("path");
const app = express();
const port = process.env.port || 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`App listening on port ${port}.`));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.post("/", (req, res) => {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result = num1 + num2;
  res.send("<p>Result: " + result + "</p>");
});

app.get("/bmicalculator", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/bmiCalculator.html"));
});

app.post("/bmicalculator", (req, res) => {
  let weight = parseFloat(req.body.weight);
  let height = parseFloat(req.body.height);
  let bmi = weight / (height * height);
  res.send(`<p>Your BMI is: ${bmi}</p>`);
});
