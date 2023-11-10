const form = document.querySelector('#loginForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Form Submit");

    // Get the username and password input values
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    // logic to access login database and return true or false here
    if (login()) {
        console.log("Login Successful");
        window.location.href = "home.html";
    }
    else {
        throw new Error("Login Failed");
    }

    // if turn then redirect to home page
    
});

async function login() {
    // const username = document.querySelector('#username').value;
    // const password = document.querySelector('#password').value;
    const username = "test";
    const password = "test";
    console.log('start')

    try {
        const response = await fetch('/api/login')
        const data = await response.json();
        console.log(data.response);
        return (true);
    }
    catch (err) {
        console.log(err);
    }
}

function NateTestButton() {
    console.log("NateTestButton")
}

// for now this is actually being used as a test button
function forgotPassword() {
    console.log("forgotPassword")

    // implement password recent functionality here
}