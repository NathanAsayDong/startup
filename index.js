const express = require('express');
const app = express();
const DB = require('./mongoDBService.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

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


// login functionality


// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}




