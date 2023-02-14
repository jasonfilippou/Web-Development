const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

app.get("/", (req, res) => {
  console.log(
    `Responding to request at root route. Request parameters: ${JSON.stringify(
      req.params
    )}`
  );
  let day = new Date().getDay();
  res.render("list", {
    day: day,
    days: {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    },
  });
});
