classes = [];
assignements = [];

function NateTestButton() {
    console.log("NateTestButton")
}

function getClasses() {
    //  getter function to get all the classes from database
}

function getAssignments() {
    //  getter function to get all the assignments from database
}

const addAssignmentForm = document.querySelector('#addAssignement');
const newClassForm = document.querySelector('#newClassForm');


addAssignmentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Form Submit");

    const className = document.querySelector('#className').value;
    const projectType = document.querySelector('#projectType').value;
    const difficulty = document.querySelector('#difficulty').value;
    const priority = document.querySelector('#priority').value;
    const description = document.querySelector('#description').value;
    const assignmentName = document.querySelector('#assignmentName').value;
    const dueDate = document.querySelector('#dueDate').value;

    const assignment = {
        className: className,
        projectType: projectType,
        difficulty: difficulty,
        priority: priority,
        description: description,
        assignmentName: assignmentName,
        dueDate: dueDate,
    }

    // logic to add assignement to database here


});

