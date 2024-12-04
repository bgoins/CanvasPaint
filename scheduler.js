// Imports node-cron library for schedualing at specific times
const cron = require('node-cron');
// Imports sendSms function from Twilio module to send a SMS
const { sendSms } = require('./twilio');
// Imports mock data of canvas assignment fetch
const { testCanvasData } = require('./app');

// Checks Twilio integration and defaults to false if var isn't set
const enableTwilio = process.env.ENABLE_TWILIO || false;

const enableTwilio = process.env.ENABLE_TWILIO === 'true';
// Scheduler setup to send SMS reminders daily at midnight (00:00)
cron.schedule('0 0 * * *', () => {
    // Msg to indicate its running the job
    console.log('Running daily reminder job...');
    
    if (!enableTwilio) {
        // Logs msg that Twilio integration is disabled
        console.log('Twilio integration is disabled. SMS reminders will not be sent.');
        return;
    }
    
    // Get today's date and the date for the next day
    const today = new Date();
    const tomorrow = new Date(today);
    // Adds a day to todays date
    tomorrow.setDate(today.getDate() + 1);
    // YYYY-MM-DD format tommorows date as a string.
    const tomorrowDateString = tomorrow.toISOString().split('T')[0];

    // Filter assignments due tomorrow and send reminders
    testCanvasData.assignments.forEach(assignment => {
        if (assignment.dueDate === tomorrowDateString) {
            // Replace with the actual phone number you have for each user
            const phoneNumber = process.env.USER_PHONE_NUMBER; // Replace with actual storage logic

            if (phoneNumber) {
                // Creates SMS message for reminder and sends using Twilio
                const message = `Reminder: Your assignment '${assignment.title}' is due tomorrow (${assignment.dueDate}).`;

                // Send reminder via Twilio
                sendSms(phoneNumber, message)
                    .then(response => {
                        if (response.success) {
                            console.log(`Reminder sent for assignment: ${assignment.title}`);
                        } else {
                            console.error(`Failed to send reminder for assignment: ${assignment.title}. Error: ${response.error}`);
                        }
                    });
            } else {
                console.log('No phone number found. SMS reminders cannot be sent.');
            }
        }
    });
});

// Logs msg that reminder job was set up successfully
console.log('Daily scheduler for SMS reminders is set up.');
