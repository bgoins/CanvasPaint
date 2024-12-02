// Copyright (c) 2024 Canvas Paint
// Licensed under the MIT License. See LICENSE file for details.


//Account creation event
document.getElementById("createAccountButton").addEventListener("click", function () {
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;

    //Validate user input email and password
    if (!email || !password) {
        alert("Please fill in all fields to create an account.");
        return;
    }

    //Store username and password in local storage
    localStorage.setItem("accountEmail", email);
    localStorage.setItem("accountPassword", password);

    //Display message when account is created successfully
    alert("Account created successfully! You can now log in.");
    document.getElementById("createAccountForm").reset();
});

//Handle login validation when user clicks log in button 
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve stored credentials from local storage
    const storedEmail = localStorage.getItem("accountEmail");
    const storedPassword = localStorage.getItem("accountPassword");


    // Validate creditentials user gave with stored credentials
    if (username === storedEmail && password === storedPassword) {
        alert("Login successful!");
        // Redirect to the main application page
        window.location.href = "index.html"; 
    }
    //Display error message if username and password do not match
    else {
        const message = document.getElementById("message");
        message.style.display = "block";
        message.textContent = "Invalid username or password.";
    }
});