
const socket = new WebSocket('ws://localhost:9900');

availableClasses = [];

async function getClasses() {
    try {
    const response = await fetch('/api/classes')
    const data = await response.json();
    availableClasses = data.map((classObj) => classObj.class);

    } catch (error) {
        console.error('Error fetching classes:', error.message);
    }
}

(async () => {
    await populateDropdown();
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
    });
}


socket.onmessage = (event) => {
    console.log('received: ', event.data);
};

socket.send('I am listening');








