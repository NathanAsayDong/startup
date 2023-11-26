socket = new WebSocket('ws://localhost:9900');
current_user = null;
availableClasses = [];
selectedClassChat = null;
showChat = false;
const classChat = document.querySelector('.classChat');
const chatHeader = document.getElementById('chatHeader');
const chatContainer = document.getElementById('chatContainer');

async function getCurrentUser() {
    try {
        const response = await fetch('/api/info');
        const data = await response.json();
        current_user = data.email;
        console.log('current user: ', current_user);
    } catch (error) {
        console.error('Error fetching current user:', error.message);
    }
}


async function getClasses() {
    try {
    const response = await fetch('/api/classes')
    const data = await response.json();
    availableClasses = data.map((classObj) => classObj.class);

    } catch (error) {
        console.error('Error fetching classes:', error.message);
    }
}

// initiate the page info
(async () => {
    await populateDropdown();
    await getCurrentUser();
})();

async function populateDropdown() {
    await getClasses();
    const classSelector = document.getElementById('classSelector');

    availableClasses.forEach((className) => {
        const option = document.createElement('option');
        option.value = className;
        option.text = className;
        classSelector.add(option);
    });

    classSelector.addEventListener('change', function () {
        // Log the selected class when the selection changes
        console.log('Selected class:', classSelector.value);
        selectedClassChat = classSelector.value;
        chatHeader.innerText = `Class Chat For ${selectedClassChat}`;;
    });
}


socket.onmessage = (event) => {
    console.log('received: ', event.data);
};


function sendMessage() {
    const message = document.getElementById('messageInput').value;
    console.log('this is message: ', message)
    socket.send(message);
    document.getElementById('messageInput').value = '';
}










