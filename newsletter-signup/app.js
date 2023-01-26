const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mailchimpClient = require("@mailchimp/mailchimp_marketing");
const EMAIL_TYPE = "html"; // Possible values: "HTML" and "text"
const SUBSCRIPTION_STATUS = "subscribed"; // Possible values: "subscribed", "unsubscribed", "cleaned", or "pending"
const LANGUAGE = "el"; // Check here for all supported language codes: https://mailchimp.com/help/view-and-edit-contact-languages/
const VIP = false;
const UPDATE_EXISTING = true;
const MAILCHIMP_LIST_ID = process.env.AUDIENCE_ID;
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const SERVER_PREFIX = process.env.SERVER_PREFIX;
const PORT = process.env.PORT || 3000;
const app = express();

/*** Serve all static resources inside `public` directory. ***/
app.use(express.static(path.join(__dirname, "public")));

/*** The following statement allows our `body-parser` instance to access form-data. ***/
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

/*** GET route endpoint ***/
app.get("/", (req, res) => {
  console.log("Serving a GET request at root route.");
  res.sendFile(path.join(__dirname, "public/signup.html"));
});

/*** Root route POST endpoint ***/
app.post("/", (req, res) => {
  console.log("Serving a POST request at root route.");

  // Define data member based on parameters of req
  // and global constants.
  const member = {
    email_address: req.body.email,
    email_type: EMAIL_TYPE,
    status: SUBSCRIPTION_STATUS,
    language: LANGUAGE,
    vip: VIP,
    merge_fields: {
      FNAME: req.body.firstName,
      LNAME: req.body.lastName,
    },
  };

  mailchimpClient.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: SERVER_PREFIX,
  });

  // Define async function that makes a call to the mailchimp batch POST lists/{list_id} endpoint.
  const postIt = async () => {
    const response = await mailchimpClient.lists.batchListMembers(
      MAILCHIMP_LIST_ID,
      {
        members: [member],
        update_existing: UPDATE_EXISTING,
      }
    );
    console.log(JSON.stringify(response)); // Want to read some output in terminal
    if (response.errors.length > 0) {
      throw new Error(response.errors);
    }
  };

  // Call the async function you defined
  //app.use(express.static(path.join(__dirname, 'public')));
  postIt()
    .then(() => res.sendFile(path.join(__dirname, "public/success.html")))
    .catch(() => res.sendFile(path.join(__dirname, "public/failure.html")));
});

/*** failure rout POST endpoint ***/
app.post("/failure", (req, res) => {
  res.redirect("/");
});
