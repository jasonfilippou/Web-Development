const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = 3000;
const app = express();

// Serve all static resources inside `public` directory.
app.use(express.static(path.join(__dirname, 'public')));

// The following statement allows our `body-parser` instance to access form-data.
app.use(bodyParser.urlencoded({extended:true}));

// Set our view engine
app.set('view engine', 'ejs');

app.listen(PORT, () => console.log(`Running on port ${PORT}!`));

app.get("/", (req, res) => {

    const getDayName = (num) => {
        switch (num) {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
            default: throw "Bad day number provided";
        }
    }

    res.render("list", {day: getDayName(new Date().getDay())});
});