const express = require('express');
const app = express();
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const { todoSchema, todoModel } = require('./models/todoModel');
const authController = require('./auth/authController');
var path = require('path');
require('dotenv').config();


const htmlPath = path.join(__dirname, 'public');

app.use(express.static(htmlPath));




// Create a connection pool to your database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Define a SQL script to create the todo table
const createTodoTable = `
  CREATE TABLE IF NOT EXISTS todo (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
`;

// Execute the SQL script to create the todo table
pool.query(createTodoTable, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Table "todo" has been created or already exists');
});

const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)`;

// Execute the SQL script to create the todo table
pool.query(createUsersTable, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Table "users" has been created or already exists');
});

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/logout', authController.logout);



app.get('/', async (req, res) => {
  res.send("Welcome");
});

app.get('/register', async (req, res) => {
  res.sendFile(__dirname + "/register.html");
});

app.get('/login', async (req, res) => {
  res.sendFile(__dirname + "/login.html");

});

// Define API endpoints
app.get('/todos', async (req, res) => {
  const todos = await todoModel.read();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = req.body;
  const newTodo = await todoModel.create(todo);
  res.json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todo = req.body;
  const updatedTodo = await todoModel.update(id, todo);
  res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  if (req.params.id == 'clear'){
      const deletedTodo = await todoModel.deleteAll();
      res.json(deletedTodo);
  }else{
    const deletedTodo = await todoModel.delete(id);

    res.json(deletedTodo);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


