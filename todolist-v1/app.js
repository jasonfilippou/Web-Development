const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = 3000;
const app = express();

// Serve all static resources inside `public` directory.
app.use(express.static(path.join(__dirname, 'public')));

// The following statement allows our `body-parser` instance to access form-data.
app.use(bodyParser.urlencoded({extended:true}));

// Set our view engine. This requires that I have a `views` top-level directory in my project.
app.set('view engine', 'ejs');

const items = ["Buy food", "Cook food", "Eat food"];

app.listen(PORT, () => console.log(`Running on port ${PORT}!`));

app.get("/", (req, res) => {
    const dateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    const today = new Date().toLocaleDateString(dateTimeFormatOptions);
    res.render("list", {day: today, items: items}); // This requires that I have set my view engine appropriately and I have "list" under my views/ subfolder.
});

app.post("/", (req, res) => {
    let newItem = req.body.newItem;  // body-parser allows us to fetch this data.
    if(req.body.newItem) {
        items.push(newItem);
    }
    res.redirect("/");  // Restarting the entire process by triggering a GET at "/".
});