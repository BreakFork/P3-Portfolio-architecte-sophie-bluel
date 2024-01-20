let inputEmail = document.getElementById("email");
let inputPWD = document.getElementById("password");
let loginForm = document.querySelector(".login-form");
let displayError = document.querySelector(".error-message");
let errorMessage = "Erreur dans l’identifiant ou le mot de passe";

/**
 * This function tests() the data coming from the Email input 
 * against the Regex pattern 
 * --> returns true or false.
 * 
 * @param {String} userMail data from the email input
 * @returns {Boolean} true || false
 * 
 */
function validateEmail(userMail) {
    let emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    return emailRegex.test(userMail);
};

/**
 * This function checks whether the data from the password entry is empty or not 
 * --> returns true or false.
 * 
 * @param {String} userPWD data from the password input
 * @returns {Boolean} true || false
 */
function validatePassword(userPWD) {
    return userPWD !== "";
};

/**
 * This function sets the token in local storage
 * 
 * @param {String} token
 */
async function setToken(token) {
    window.localStorage.setItem("token", token);
};

/**
* This function sends data to the API and receives the result:
* if successful: sets the token and does the redirection,
* otherwise: sets the error message to display it.
 * 
 * @param {Object} data 
 */
async function sendData(data) {
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: data
        });

        const result = await response.json();

        if (!response.ok) {
            displayError.innerText = errorMessage;
        };
        if (response.status === 401) {
            throw new Error("Not Authorized");
        };
        if (response.status === 404) {
            throw new Error("User not found")
        } else {
            setToken(result.token).then(window.location.href = "./index.html");
            // console.log(window.localStorage.getItem("token"));
        };
    } catch (error) {
        console.log(error);
    };
};

/**
 * Adds an eventListener to the login form for the submit event.
 * If both validations are correct: create and submit the data,
 * otherwise: show an error message.
 * 
 */
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let userMail = inputEmail.value;
    let userPWD = inputPWD.value;

    if (validateEmail(userMail) && validatePassword(userPWD)) {
        displayError.innerText = "";

        let data = {
            "email": userMail,
            "password": userPWD
        }
        sendData(JSON.stringify(data));
    } else {
        displayError.innerText = "Erreur dans l’identifiant ou le mot de passe";
    }
});
