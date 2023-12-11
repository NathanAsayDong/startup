const form = document.querySelector('#loginForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Form Submit");

    // Get the username and password input values
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    // logic to access login database and return true or false here
    if (login()) {
        login();
    }
    if (createAccount()) {
        createAccount();
    }
    else {
        throw new Error("Login Failed");
    }

    // if turn then redirect to home page
    
});

function NateTestButton() {
    console.log("NateTestButton")
}

// for now this is actually being used as a test button
function forgotPassword() {
    console.log("forgotPassword")

    // implement password recent functionality here
}



// login functionality
async function login() {
    loginOrCreate(`/api/auth/login`);
}

async function createAccount() {
    loginOrCreate(`/api/auth/create`);
}

// Dont need this possibly
// (async () => {
//     const userName = localStorage.getItem('userName');
//     if (userName) {
//     document.querySelector('#playerName').textContent = userName;
//     setDisplay('loginControls', 'none');
//     setDisplay('playControls', 'block');
//     } else {
//     setDisplay('loginControls', 'block');
//     setDisplay('playControls', 'none');
//     }
// })();

async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#username')?.value;
    const password = document.querySelector('#password')?.value;
    const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    });

    if (response.ok) {
    localStorage.setItem('userName', userName);
    window.location.href = 'home.html';
    } else {
    const body = await response.json();
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
    }
}

async function getUser(email) {
    let scores = [];
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
    return response.json();
    }

    return null;
}

function logout() {
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
    method: 'delete',
    }).then(() => (window.location.href = '/'));
}