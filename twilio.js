
require('dotenv').config(); // Import dotenv to load environment variables
const twilio = require('twilio');

// Use environment variables for Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'default_account_sid';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'default_auth_token';
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';

// Twilio client setup
const client = twilio(accountSid, authToken);

// Function to send SMS using Twilio
function sendSms(to, message) {
    if (accountSid === 'default_account_sid' || authToken === 'default_auth_token') {
        console.warn('Twilio credentials are not set. Skipping SMS.');
        return Promise.resolve({ success: false, message: 'Twilio credentials not set' });
    }

    return client.messages
        .create({
            body: message,
            from: twilioPhoneNumber,
            to: to,
        })
        .then(response => {
            console.log(`Message sent: ${response.sid}`);
            return { success: true, sid: response.sid };
        })
        .catch(error => {
            console.error('Error sending SMS:', error.message);
            return { success: false, error: error.message };
        });
}

module.exports = { sendSms };
