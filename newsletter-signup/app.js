const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/signup.html"));
});

app.post("/signup", (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  console.log(firstName + " " + lastName + " " + email);
});
