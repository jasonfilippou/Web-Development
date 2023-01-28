const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: process.env.SERVER_PREFIX
});

async function run() {
    const response = await mailchimp.ping.get();
    console.log(response);
}

run();