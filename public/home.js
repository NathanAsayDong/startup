function NateTestButton() {
    console.log("NateTestButton");
}

// these variables will use getter functions that pull the list from the database
// classes = getClasses()
// assignments = getAssignments();

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

function displayCurrentTime() {
    const currentTime = getCurrentTime();
    const timeDisplay = document.getElementById('timeDisplay');
    timeDisplay.textContent = `Time: ${currentTime}`;
    // reset the loop for another 30 seconds
    setTimeout(displayCurrentTime, 30000);
}

displayCurrentTime();


// just for testing and demo purpose
const tempAssignments = [
    {
    className: "Math",
    projectType: "Homework",
    difficulty: "Medium",
    priority: "High",
    description: "Complete exercises 1-10",
    assignmentName: "Homework 1",
    dueDate: "2023-11-01",
    },
    {
    className: "History",
    projectType: "Quiz",
    difficulty: "Easy",
    priority: "Medium",
    description: "Study for the quiz on chapter 3",
    assignmentName: "Quiz on Chapter 3",
    dueDate: "2023-11-05",
    },
    {
    className: "Science",
    projectType: "Project",
    difficulty: "Hard",
    priority: "High",
    description: "Research and present on a scientific topic",
    assignmentName: "Science Project",
    dueDate: "2023-11-10",
    },
    {
    className: "English",
    projectType: "Homework",
    difficulty: "Medium",
    priority: "Low",
    description: "Read pages 50-100 and write a summary",
    assignmentName: "Reading Assignment",
    dueDate: "2023-11-15",
    },
    {
    className: "Computer Science",
    projectType: "Test",
    difficulty: "Hard",
    priority: "High",
    description: "Prepare for the final exam",
    assignmentName: "Final Exam",
    dueDate: "2023-11-30",
    },
];

function filterAssignments(assignment, selectedClass, selectedDifficulty, selectedPriority) {
    console.log(selectedClass)
    console.log(assignment.className)
    const classMatch = selectedClass === 'all' || assignment.className === selectedClass;
    const difficultyMatch = selectedDifficulty === 'all' || assignment.difficulty === selectedDifficulty;
    const priorityMatch = selectedPriority === 'all' || assignment.priority === selectedPriority;

    console.log(classMatch &&  difficultyMatch && priorityMatch)
    return classMatch && difficultyMatch && priorityMatch;

}


function displayFilteredAssignments(selectedClass, selectedDifficulty, selectedPriority) {
    const tasksList = document.querySelector('.tasks ul');
    tasksList.innerHTML = '';

    tempAssignments.forEach((assignment) => {
        if (filterAssignments(assignment, selectedClass, selectedDifficulty, selectedPriority)) {
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
        tasksList.appendChild(listItem);
        }
    });
}

const classFilter = document.getElementById('classFilter');
const difficultyFilter = document.getElementById('difficultyFilter');
const priorityFilter = document.getElementById('priorityFilter');

classFilter.addEventListener('change', () => {
    console.log("using class filter", classFilter.value.toString())
    displayFilteredAssignments(classFilter.value.toString(), difficultyFilter.value.toString(), priorityFilter.value.toString());
});

difficultyFilter.addEventListener('change', () => {
    displayFilteredAssignments(classFilter.value.toString(), difficultyFilter.value.toString(), priorityFilter.value.toString());
});

priorityFilter.addEventListener('change', () => {
    displayFilteredAssignments(classFilter.value.toString(), difficultyFilter.value.toString(), priorityFilter.value.toString());
});

displayFilteredAssignments('all', 'all', 'all');




