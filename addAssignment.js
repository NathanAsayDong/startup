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

function getAssignments() {
    //  getter function to get all the assignments from database
}

newClassForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const newClass = document.querySelector('#newClass').value;

    console.log("Form Submit");
    console.log(newClass);

    const newClassObject = {class : newClass}
    console.log(newClassObject);
    try {
        const response = await fetch('/api/classes', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newClassObject),
        });
    } catch {
        console.log("error adding class")
    }
});


addAssignmentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("Form Submit");

    const className = document.querySelector('#className').value;
    const projectType = document.querySelector('#projectType').value;
    const difficulty = document.querySelector('#difficulty').value;
    const priority = document.querySelector('#priority').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#dueDate').value;

    const assignment = {
        className: className,
        projectType: projectType,
        difficulty: difficulty,
        priority: priority,
        description: description,
        dueDate: dueDate,
        creationDate: new Date(),
    }
    console.log(assignment);
    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(assignment),
        });
        } catch {
        // If there was an error then just track scores locally
        console.log("error adding task")
        }

});

