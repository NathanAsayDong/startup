classes = [];
assignements = [];
showNewClassForm = false;
const newClassForm = document.querySelector('.add-class-form');
const addAssignmentForm = document.querySelector('#addAssignement');
newClassForm.style.display = showNewClassForm ? 'block' : 'none';


function toggleNewClassForm() {
    if (showNewClassForm) {
        showNewClassForm = false;
    } else {
        showNewClassForm = true;
    }

    newClassForm.style.display = showNewClassForm ? 'block' : 'none';
}

function getClasses() {
    //  getter function to get all the classes from database
}

function getAssignments() {
    //  getter function to get all the assignments from database
}

newClassForm.addEventListener('submit', (event) => {
    const newClass = document.querySelector('#newClass').value;

    // add logic to add the new class to the database here
});


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

