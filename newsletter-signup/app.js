const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const md5 = require('md5');
const mailchimp = require("@mailchimp/mailchimp_marketing");

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

  mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: process.env.SERVER_PREFIX
  });

  const subscribeIfNotAlreadySubscribed = async () => {
    const response = await mailchimp.lists.setListMember(
        process.env.AUDIENCE_ID,
        md5(email),
        { email_address: email, status_if_new: "subscribed" }
    );
    console.log("Response received from mailchimp: " + response);
  };

  console.log("Sending conditional subscription request to Mailchimp...")
  subscribeIfNotAlreadySubscribed().then(r=>r);
});
