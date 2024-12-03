// Replace these with your Twilio trial account credentials
const accountSid = 'your_trial_account_sid_here'; // Your actual Twilio Account SID
const authToken = 'your_trial_auth_token_here';   // Your actual Twilio Auth Token
const twilioPhoneNumber = '+1234567890';          // Your Twilio phone number (should match the trial account number)

const twilio = require('twilio');
const client = twilio(accountSid, authToken);

// Function to send SMS using Twilio
function sendSms(to, message) {
    return client.messages
        .create({
            body: message,
            from: twilioPhoneNumber,
            to: to,
        })
        .then(response => {
            console.log(`Message sent successfully: ${response.sid}`);
            return { success: true, sid: response.sid };
        })
        .catch(error => {
            console.error('Error sending SMS:', error.message);
            return { success: false, error: error.message };
        });
}

module.exports = { sendSms };
