import { testValue } from "./firebaseAuth.service";
console.log(testValue);

const form = document.querySelector('#loginForm');
console.log(form);


form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Form Submit");

    // Get the username and password input values
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    // logic to access login database and return true or false here
    apiRouter.get('api/login', (req, res) => {
        if (res) {
            window.location.href = "home.html";
        }
    })


    // if turn then redirect to home page
    
    window.location.href = "home.html";
});

function NateTestButton() {
    console.log("NateTestButton")
}

// for now this is actually being used as a test button
function forgotPassword() {
    console.log("forgotPassword")

    // implement password recent functionality here
}