// Imports node-cron library for schedualing at specific times
const cron = require('node-cron');
// Imports sendSms function from Twilio module to send a SMS
const { sendSms } = require('./twilio');
// Imports mock data of canvas assignment fetch
const { testCanvasData } = require('./app');

// Checks Twilio integration and defaults to false if var isn't set
const enableTwilio = process.env.ENABLE_TWILIO || false;

// Scheduler setup to send SMS reminders daily at midnight (00:00)
cron.schedule('0 0 * * *', () => {
    // Msg to indicate its running the job
    console.log('Running daily reminder job...');

    // Get today's date and the date for the next day
    const today = new Date();
    const tomorrow = new Date(today);
    // Adds a day to todays date
    tomorrow.setDate(today.getDate() + 1);
    // YYYY-MM-DD format tommorows date as a string.
    const tomorrowDateString = tomorrow.toISOString().split('T')[0];

    // Filter assignments due tomorrow and send reminders
    if (enableTwilio) {
        testCanvasData.assignments.forEach(assignment => {
            if (assignment.dueDate === tomorrowDateString) {
                // Creates SMS msg for reminder and retrieves phone # to send SMS from and sneds using Twilio
                const message = `Reminder: Your assignment '${assignment.title}' is due tomorrow (${assignment.dueDate}).`;
                const phoneNumber = localStorage.getItem('phoneNumber'); // Get phone number from local storage
                    if (phoneNumber && enableTwilio) {
                        testCanvasData.assignments.forEach(assignment => {
                            if (assignment.dueDate === tomorrowDateString) {
                            const message = `Reminder: Your assignment '${assignment.title}' is due tomorrow (${assignment.dueDate}).`;
                            sendSms(phoneNumber, message);
                        }
                    });
                } else {
                    console.log('Twilio integration is disabled or phone number not set. SMS reminders will not be sent.');
                }

                // Send reminder via Twilio
                sendSms(phoneNumber, message);
            }
        });
    } else {
        // Logs msg that twilio integration is disabled
        console.log('Twilio integration is disabled. SMS reminders will not be sent.');
    }
});
// Logs msg that reminder was set up successfully.
console.log('Daily scheduler for SMS reminders is set up.');
