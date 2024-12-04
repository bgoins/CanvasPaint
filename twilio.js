 // Import dotenv to load environment variables
require('dotenv').config();
const twilio = require('twilio');

// Environment variables for Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'default_account_sid';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'default_auth_token';
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';

// Twilio client setup with SID and Auth Token from Twilio
const client = twilio(accountSid, authToken);

// Send SMS using Twilio
/*
 * Sends an SMS to a specified phone number.
 *
 * @param {string} to - Recipient's phone number format:(+15555555555).
 * @param {string} message - The msg for sending.
 * @returns {Promise<Object>} - A promise resolving to an object for success/faliure.
 */

// Function to send SMS using Twilio
function sendSms(to, message) {
    // Checks if credentials are set and if not, logs a warning and skips SMS
    if (accountSid === 'default_account_sid' || authToken === 'default_auth_token') {
        console.warn('Twilio credentials are not set. Skipping SMS.');
        return Promise.resolve({ success: false, message: 'Twilio credentials not set' });
    }

    // Uses Twilio client to craft and send SMS msg
    return client.messages
        .create({
            // SMS content, Senders Twilio phone #, Recipiants phnone #
            body: message,
            from: twilioPhoneNumber,
            to: to,
        })
        .then(response => {
            // Logs msg SID on completed delivery of SMS
            console.log(`SMS sent: ${response.sid}`);
            return { success: true, sid: response.sid };
        })
        .catch(error => {
            // Logs encountered errors while sending SMS
            console.error('Error sending SMS:', error.message);
            return { success: false, error: error.message };
        });
}
// Exports the sendMS function for use in other components of the app
module.exports = { sendSms };
