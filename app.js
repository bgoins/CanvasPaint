// Copyright (c) 2024 Canvas Paint
// Licensed under the MIT License. See LICENSE file for details.

//Import WebSocket and axios libraries
const WebSocket = require('ws');

const axios = require('axios');

//Create new WebSocket server that listens on port 8080
const WebSocketServer = new WebSocket.Server({ port: 8080 });


//Event when client connects to WebSocket server
WebSocketServer.on('connection', ws => {

    //Listen for messages 
    ws.on('message', message => {
        console.log(`Message recieved => ${message}`);
    });

    //Code used to test API calls with mock data
    ws.send(JSON.stringify(testCanvasData))
    
    

    //Function to get data from Canvas API
    /*
    const fetchData = async () => {

        //Get access to data with access token
        try {
            const response = await axios.get('https://canvas-api-url', {
                headers: { 'Authorization': 'Bearer ACCESS_TOKEN' }
            });

            const CanvasData = response.data;

            //Send data
            ws.send(JSON.stringify(CanvasData));

        } catch (error) {
            console.error('An error occured when fetching data from Canvas', error)
        }
    };
    
    setInterval(fetchData, 10000) //Get data every 10 seconds */
    
});

//Console message when the server is running and listening on port 8080
console.log('Server is running on ws://localhost:8080')


//Mock data to simulate Canvas API calls
const testCanvasData = {
    courses: [
        { num: 3300, name: 'Introduction to Software Engineering', section: 4 },
        { num: 3080, name: 'Python Programming', section: 1 },
        { num: 3090, name: 'Linear Algebra', section: 3 },
        { num: 3010, name: 'Social and Ethical Imp. of Computing', section: 1 }
    ],
    assignments: [
        { num: 3300, title: 'Assignment 5', dueDate: '2024-11-27' },
        { num: 3080, title: 'HW 6', dueDate: '2024-11-25' },
        { num: 3080, title: 'HW 7', dueDate: '2024-12-27' },
        { num: 3010, title: 'Essay', dueDate: '2024-11-27' },
        { num: 3090, title: 'Chapter 5', dueDate: '2024-11-26' },
        { num: 3010, title: 'Final', dueDate: '2024-12-02' }
    ]
};
