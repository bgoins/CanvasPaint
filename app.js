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

//Specify the port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
