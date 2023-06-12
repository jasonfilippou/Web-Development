const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

let newItems = ["Buy Food", "Kiss Girlfriend", "Kiss Girlfriend again"];
let workItems = [];
app.get("/", (req, res) => {
    console.log(
        `Responding to GET request at root route. Request parameters: ${JSON.stringify(
            req.params
        )}`
    );
    let today = new Date();
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    res.render("list", {
        listTitle: today.toLocaleDateString("en-us", options),
        newItems: newItems,
    });
});

app.get("/work", (req, res) => {
    console.log(`Responding to GET Request at work route. Request parameters: ${JSON.stringify(req.params)}`);
    res.render("list", {
        listTitle: "Work",
        newItems: workItems
    })
});


app.post("/", (req, res) => {
    console.log(
        `Responding to POST request at root route. Request parameters: ${JSON.stringify(
            req.params
        )}`
    );
    newItems.push(req.body.newItem);
    res.redirect("/");
});
