"use server"


const mailchimp = require("@mailchimp/mailchimp_marketing");
import crypto from "crypto";

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX
});

const audienceID = process.env.MAILCHIMP_AUDIENCE_ID



export const addSubscriber = async (formData) => {

    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const instrument = formData.get("instrument")


    try {
        // Add subscriber
        await mailchimp.lists.addListMember(audienceID, {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                "FNAME": firstName,
                "LNAME": lastName,
                "PHONE": phone,
                "INSTRUMENT": instrument
            }
        });

        // Assign tag to subscriber
        const formattedEmail = email.toLowerCase();
        const subscriberHash = crypto.createHash("md5").update(formattedEmail).digest("hex");

        await mailchimp.lists.updateListMemberTags(audienceID, subscriberHash, {
            tags: [
                { name: "current/returning students", status: "active" },
                { name: instrument, status: "active" }
            ],
          });

        return {message: `Success! The email ${email} was successfully added to Mailchimp!`}

    } catch (error) {
        console.error("Error details:", error);
        if(error.response?.body?.title === "Member Exists") {
            return {error: `Oops, looks like the email ${email} is already subscribed!`}
        } else {
            return {error: `Oops, something went wrong.`}
        }
    }
}




