const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const classesCollection = db.collection('classes');
const tasksCollection = db.collection('tasks');
const userCollection = db.collection('user');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function getUserName(token) {
  const user = await userCollection.findOne({ token: token });
  return user.email;
}

async function addClass(className) {
  const result = await classesCollection.insertOne(className);
  return result;
}

async function addTask(task) {
  const result = await tasksCollection.insertOne(task);
  return result;
}

async function getClasses() {
  const result = await classesCollection.find({}, { projection: { class: 1, _id: 0 } }).toArray();
  return result;
}

async function getTasks() {
  const result = await tasksCollection.find({}, { projection: { _id: 0 } }).toArray();
  return result;
}

// function getTasks() {
//   const query = { score: { $gt: 0, $lt: 900 } };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }

module.exports = { addClass, addTask , getClasses, getTasks, getUser, getUserByToken, createUser, getUserName };
