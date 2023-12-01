document.addEventListener("DOMContentLoaded", function () {
    const signinForm = document.getElementById("signin-form");
    const errorMessage = document.getElementById("error-message");

    signinForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Example validation (replace with your own authentication logic)
        if (username === "koushik" && password === "123456789") {
            // Successful login, redirect or perform other actions here
            alert("Login successful!"); 
            window.location.href="book.html";
                } else {
            // Display error message for unsuccessful login
            errorMessage.textContent = "Invalid username or password.";
            errorMessage.classList.remove("hidden");
        }
    });
});
