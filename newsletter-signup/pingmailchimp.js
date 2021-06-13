const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.SERVER_ID,
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response)
}

run();