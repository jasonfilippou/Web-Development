const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

// Serve all static resources inside `public` directory.
app.use(express.static(path.join(__dirname, 'public')));

// The following statement allows our `body-parser` instance to access form-data.
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});

// GET root endpoint
app.get("/", (req, res) => {
  console.log("Serving a GET request at root route.");
  res.sendFile(path.join(__dirname, "public/signup.html"));
});

// POST route endpoint
app.post("/", (req, res) => {
  console.log("Serving a POST request at root route.");
  let firstName, lastName, email;
  [firstName, lastName, email] = [req.body.firstName, req.body.lastName, req.body.email];
  res.send("<h1>All good, thanks!</h1>");
})
