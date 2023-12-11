const express = require('express');
const http = require('http');
const app = express();
const DB = require('./mongoDBService.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const authCookieName = 'token';
const uuid = require('uuid');
const { WebSocketServer } = require('ws');



// The service port. In production the front-end code is statically hosted by the service on the same port.
port = process.argv.length > 2 ? process.argv[2] : 4000;

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

const httpService = app.listen(port, () => {
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

apiRouter.get('/classes', async (req, res) => {
  console.log("Classes Get Request")
  classes = await DB.getClasses();
  res.send(classes);
});

apiRouter.post('/newTransaction', (req, res) => {
  console.log("New Transaction Request")
  console.log(req.body)
  DB.addTransaction(req.body);
  res.send(req.body)
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

// get the current user
apiRouter.get('/info', async (req, res) => {
  const token = req?.cookies.token;
  const user = await DB.getUserByToken(token);
  if (user) {
    res.send({ email: user.email, authenticated: true });
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
  console.log("User: ", user)
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

// websocket implementation

const wss = new WebSocketServer({ noServer: true });

httpService.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

connections = [];

wss.on('connection', (ws) => {
  const connection = { id: uuid.v4(), alive: true, ws: ws };
  connections.push(connection);

  // Forward messages to everyone except the sender
  ws.on('message', function message(data) {
    messageObj = JSON.parse(data); // get the data formatted as a JSON object
    messageObj = JSON.stringify(messageObj); // reformate as a string
    connections.forEach((c) => {
    c.ws.send(messageObj);
    });
  });


  // Remove the closed connection so we don't try to forward anymore
  ws.on('close', () => {
    connections.findIndex((o, i) => {
      if (o.id === connection.id) {
        connections.splice(i, 1);
        return true;
      }
    });
  });
});

// Keep active connections alive
setInterval(() => {
  connections.forEach((c) => {
    // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);



//// previous code

// const wss = new WebSocketServer({ port: 9900 });
// wss.on('connection', (ws) => {
//   ws.on('message', (data) => {
//     messageObj = JSON.parse(data); // get the data formatted as a JSON object
//     messageObj = JSON.stringify(messageObj); // reformate as a string
//     ws.send(messageObj);
//   });
//   // ws.send('Hello webSocket');
// });