# CanvasPaint
Ashlee Paradis, Reese Noller, Brian Goins, Dallin Hunt
Kathleen Stempeck
CS3300 004
3 December 2024
README File for Tas

# Project Overview
Canvas Paint is a web-based school planner application that integrates with the Canvas API to display courses, assignments, and quizzes for students. This README provides step-by-step instructions to set up, install, and run the project. This application implements many key features and design components so that students can track their assignments better.  These features include displaying assignments, quizzes, and tests in an organized and efficient manner and displaying assignments added by the student.  Colored circles are displayed next to assignments so students can visually see due dates, and the student can customize the meaning of these colors.  This web application also includes a login page and user authentication upon signing in to their account
# Prerequisites
Install the following software on your system:
- Node.js (version 16.0.0 or higher)
- Visual Studios 2022 (or higher)
- Eclipse
- Any modern web browser (e.g., Chrome, Edge)
# Installation
- Download the codebase from GitHub. 
# Execution
- To start the server, open Eclipse. Navigate to serverFiles/server/src/backend/MainWebSocketServer.
- Run the program. Note the terminal logging when the server has started.
- To start the webpage, open the Visual Studios IDE terminal. Navigate to webpageFiles and run and debug the app.js file using node.js.
- After the terminal logs that the server has started, open a browser.
- Connect to localhost:8080.
# Testing the Application
Mock Data
This web-application uses mock data sent from the WebSocket to simulate Canvas API responses.  Real course material from Canvas will not be displayed in the dashboard section of the website.
Functionality to Test Program
- Login and Account Creation
-- Create an account, and after the successful account creation popup, log in with the same credentials.
- Course and Assignment Display
-- Verify any mock data is displayed accurately.  Assignments with due dates within the next two weeks are only displayed in the Upcoming Assignments section.
- Color Indicators
-- Check assignments are displayed with the appropriate color code (red for due the next day, yellow for due within one week, and green for due beyond two weeks)
- Adding a Custom Assignment
-- Click Add Assignment button and add assignment name and due date. 
-- Page must be refreshed to see results.
- Customize Colors for Color Indicator System
-- Navigate to the Settings tab located on the right-hand menu and input the number of days until due each color represents.
-- Page must be refreshed to see results.
- Automatic Text Notification System
# Troubleshooting
- Dependencies not installed for Visual Studios:
-- Ensure npm install runs correctly and all packages are installed. (ws, express)
- Port in use:
-- Modify port number in app.js file to an available port
-- Modify port number in MainWebSocketServer file to an available port
-- Ensure that the port number in the index.html file for the WebSocket matches the one in the MainWebSocketServer
- Issues regarding Eclipse
-- Update maven project
-- Clean and build project
-- If no solutions work, please contact Brian Goins (i.e. build path issues)
We are available for any other issues that arise.
# Contact Information
Ashlee Paradis – aparadis@uccs.edu
Brian Goins – bgoins@uccs.edu
Reed Noller – rnoller@uccs.edu 




