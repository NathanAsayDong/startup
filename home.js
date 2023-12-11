function NateTestButton() {
    console.log("NateTestButton");
}

// these variables will use getter functions that pull the list from the database
// classes = getClasses()
// assignments = getAssignments();

async function getCurrentTime() {
    try {
        // Replace 'http://worldtimeapi.org/api/ip' with the appropriate API endpoint
        const response = await fetch('http://worldtimeapi.org/api/ip');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const utcDatetime = new Date(data.utc_datetime);
        return utcDatetime;
    } catch (error) {
        console.error('Error fetching current time:', error.message);
        return null;
    }
}

async function displayCurrentTime() {
    const currentTime = await getCurrentTime();

    if (currentTime !== null) {
        const timeOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
            timeZone: 'UTC', // Adjust this to your desired time zone
        };

        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(currentTime);

        const timeDisplay = document.getElementById('timeDisplay');
        timeDisplay.textContent = `${formattedTime}`;
    }

    // reset the loop for another 30 seconds
    setTimeout(displayCurrentTime, 30000);
}

displayCurrentTime();

let tempAssignments = [];

// just for testing and demo purpose
async function getTasks() {
    const response = await fetch('/api/tasks')
    const data = await response.json();
    console.log(data);
    tempAssignments = data;
    displayFilteredAssignments('all', 'all', 'all');
}

getTasks();

function filterAssignments(assignment, selectedClass, selectedDifficulty, selectedPriority) {
    const classMatch = selectedClass === 'all' || assignment.className === selectedClass;
    const difficultyMatch = selectedDifficulty === 'all' || assignment.difficulty === selectedDifficulty;
    const priorityMatch = selectedPriority === 'all' || assignment.priority === selectedPriority;

    return classMatch && difficultyMatch && priorityMatch;
}

function renderAssignment(assignment) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>Class:</strong> ${assignment.className}<br>
        <strong>Project Type:</strong> ${assignment.projectType}<br>
        <strong>Difficulty:</strong> ${assignment.difficulty}<br>
        <strong>Priority:</strong> ${assignment.priority}<br>
        <strong>Description:</strong> ${assignment.description}<br>
        <strong>Assignment Name:</strong> ${assignment.assignmentName}<br>
        <strong>Due Date:</strong> ${assignment.dueDate}<br>
        <hr>`;
    return listItem;
}

function displayFilteredAssignments(selectedClass, selectedDifficulty, selectedPriority) {
    const tasksList = document.querySelector('.tasks ul');
    tasksList.innerHTML = '';

    tempAssignments.forEach((assignment) => {
        if (filterAssignments(assignment, selectedClass, selectedDifficulty, selectedPriority)) {
            const listItem = renderAssignment(assignment);
            tasksList.appendChild(listItem);
        }
    });
}

const classFilter = document.getElementById('classFilter');
const difficultyFilter = document.getElementById('difficultyFilter');
const priorityFilter = document.getElementById('priorityFilter');

classFilter.addEventListener('change', () => {
    displayFilteredAssignments(classFilter.value.toString(), difficultyFilter.value.toString(), priorityFilter.value.toString());
});

difficultyFilter.addEventListener('change', () => {
    displayFilteredAssignments(classFilter.value.toString(), difficultyFilter.value.toString(), priorityFilter.value.toString());
});

priorityFilter.addEventListener('change', () => {
    displayFilteredAssignments(classFilter.value.toString(), difficultyFilter.value.toString(), priorityFilter.value.toString());
});

function logout() {
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
    method: 'delete',
    }).then(() => (window.location.href = '/'));
}

function reactActivity() {
    window.location.href = 'checklistReact.html';
}

function navToAnnouncments() {
    window.location.href = 'announcements.html';
}

function navToHome() {
    window.location.href = 'home.html';
}

function navToAddAssignment() {
    window.location.href = 'addAssignment.html';
}






