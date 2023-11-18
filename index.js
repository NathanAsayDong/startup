const express = require('express');
const app = express();
const DB = require('./mongoDBService.js');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

///////// DONT TOUCH ABOVE THIS //////////

apiRouter.get('/login', (req, res) => {
  console.log("Login Request")
  testJson = {response: "IT RESPONDED"}
  res.send( testJson )
});

// apiRouter.get('/tasks', (req, res) => {
//   console.log("Tasks Request")
//   testJson = [
//     {
//       "Class": "Math",
//       "ProjectType": "Homework",
//       "Difficulty": "Medium",
//       "Priority": "High",
//       "Description": "Complete exercises 1-10",
//       "AssignmentName": "Homework 1",
//       "DueDate": "2023-11-01"
//     },
//     {
//       "Class": "History",
//       "ProjectType": "Quiz",
//       "Difficulty": "Easy",
//       "Priority": "Medium",
//       "Description": "Study for the quiz on chapter 3",
//       "AssignmentName": "Quiz on Chapter 3",
//       "DueDate": "2023-11-05"
//     },
//     {
//       "Class": "Science",
//       "ProjectType": "Project",
//       "Difficulty": "Hard",
//       "Priority": "High",
//       "Description": "Research and present on a scientific topic",
//       "AssignmentName": "Science Project",
//       "DueDate": "2023-11-10"
//     },
//     {
//       "Class": "English",
//       "ProjectType": "Homework",
//       "Difficulty": "Medium",
//       "Priority": "Low",
//       "Description": "Read pages 50-100 and write a summary",
//       "AssignmentName": "Reading Assignment",
//       "DueDate": "2023-11-15"
//     },
//     {
//       "Class": "Computer Science",
//       "ProjectType": "Test",
//       "Difficulty": "Hard",
//       "Priority": "High",
//       "Description": "Prepare for the final exam",
//       "AssignmentName": "Final Exam",
//       "DueDate": "2023-11-30"
//     }
//   ]
//   res.send( testJson )
// });

apiRouter.get('/tasks', async (req, res) => {
  console.log("Tasks Request")
  tasks = await DB.getTasks();
  res.send(tasks);
});

// add a task to the database
apiRouter.post('/tasks', (req, res) => {
  console.log("Tasks Post Request")
  console.log(req.body)
  DB.addTask(req.body);
  res.send(req.body)
});

// add a class to the database
apiRouter.post('/classes', (req, res) => {
  console.log("Classes Post Request")
  console.log(req.body)
  DB.addClass(req.body);
  res.send(req.body)
});

apiRouter.get('/classes', (req, res) => {
  console.log("Classes Get Request")
  res.send(DB.getClasses());
});

  





