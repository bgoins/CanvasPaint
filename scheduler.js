
const cron = require('node-cron');
const { sendSms } = require('./twilio'); // Import the sendSms function
const { testCanvasData } = require('./app'); // Import the mock data from app.js

const enableTwilio = process.env.ENABLE_TWILIO || false;

// Scheduler setup to send SMS reminders daily at midnight (00:00)
cron.schedule('0 0 * * *', () => {
    console.log('Running daily reminder job...');

    // Get today's date and the date for the next day
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowDateString = tomorrow.toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Filter assignments due tomorrow and send reminders
    if (enableTwilio) {
        testCanvasData.assignments.forEach(assignment => {
            if (assignment.dueDate === tomorrowDateString) {
                const message = `Reminder: Your assignment '${assignment.title}' is due tomorrow (${assignment.dueDate}).`;
                const phoneNumber = process.env.TWILIO_PHONE_NUMBER; // Using the phone number from .env

                // Send reminder via Twilio
                sendSms(phoneNumber, message);
            }
        });
    } else {
        console.log('Twilio integration is disabled. No SMS reminders will be sent.');
    }
});

console.log('Daily scheduler for SMS reminders is set up.');
