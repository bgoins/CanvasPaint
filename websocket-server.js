// Copyright (c) 2024 Canvas Paint
// Licensed under the MIT License. See LICENSE file for details.

//Setup for express html page
const express = require('express');
const path = require('path');

const app = express();

app.use(bodyParser.json());
//Specify the path to pull files from
app.use(express.static(path.join(__dirname)));

//Specify the file to use for display
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Store the phone number (this is temporary; use a database in a real app)
let userPhoneNumber = '';

// Endpoint to update phone number
app.post('/api/update-phone-number', (req, res) => {
    const { phoneNumber } = req.body;
    
    // Simple validation for phone number format
    const phoneRegex = /^\+\d{10,}$/;
    if (phoneRegex.test(phoneNumber)) {
        userPhoneNumber = phoneNumber;
        res.status(200).json({ message: 'Phone number saved successfully' });
    } else {
        res.status(400).json({ message: 'Invalid phone number. Please use +1234567890 format.' });
    }
});

// Endpoint to retrieve the stored phone number
app.get('/api/get-phone-number', (req, res) => {
    if (userPhoneNumber) {
        res.status(200).json({ phoneNumber: userPhoneNumber });
    } else {
        res.status(404).json({ message: 'No phone number found.' });
    }
});
//Specify the port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
