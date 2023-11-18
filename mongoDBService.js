const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const classesCollection = db.collection('classes');
const tasksCollection = db.collection('tasks');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

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
  console.log(result);
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

module.exports = { addClass, addTask , getClasses, getTasks };
