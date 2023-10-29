function NateTestButton() {
    console.log("NateTestButton");
}

// just for testing and demo purposes
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


const tasksList = document.querySelector('.tasks ul');
tasksList.innerHTML = '';
tempAssignments.forEach((assignment) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <strong>Class:</strong> ${assignment.className}<br>
    <strong>Project Type:</strong> ${assignment.projectType}<br>
    <strong>Difficulty:</strong> ${assignment.difficulty}<br>
    <strong>Priority:</strong> ${assignment.priority}<br>
    <strong>Description:</strong> ${assignment.description}<br>
    <strong>Assignment Name:</strong> ${assignment.assignmentName}<br>
    <strong>Due Date:</strong> ${assignment.dueDate}<br>
    <hr>
    `;

    // Append the created list item to the tasksList
    tasksList.appendChild(listItem);
});

