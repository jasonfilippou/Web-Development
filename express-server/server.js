const express = require("express");
const app = express();
let requestsServed = 0;

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});

let myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

let requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
}

app.use("/", myLogger);
app.use("/contact", requestTime);

app.get("/", (req, res) => {
    console.log("Serving a GET at route \"/\". This is request \#" + (requestsServed++) + ".");
    res.send("<h1>Hello!</h1>");
});

app.get("/contact", (req, res) => {
  console.log("Serving a GET at route \/contact.  This is request \#" + (requestsServed++) + ". Request time: " + req.requestTime + ".");
  res.send("<p>Contact me at <a href = \"mailto:jason.filippou@gmail.com\" alt=\"Link to e-mail address: jason.filippou@gmail.com\">jason.filippou@gmail.com</a></p>");
});

app.get(["/about", "/about2"], (req, res) => {
   console.log("Serving a GET at route \/about.  This is request \#" + (requestsServed++) + ".");
   res.send("<p>I'm Jason and I have crippling depression!</p>");
});
