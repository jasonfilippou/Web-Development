const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, () => {
  console.log("Server spun on port 3000.");
});

app.get("/", (req, res) => {
  console.log("Serving a GET request at root route.");
  res.sendFile(absoluteDirPath() + "index.html");
});

app.post("/", (req, res) => {
  console.log("Serving a POST request at root route.");
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  res.send("<h3>Result: " + (num1 + num2) + "</h3>");
});

function absoluteDirPath() {
  const path = require('path');
  return __dirname + path.sep;
}
