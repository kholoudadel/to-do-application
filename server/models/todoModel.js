const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool to your database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Define the schema for your to-do item
const todoSchema = {
  title: { type: 'string', required: true },
  description: { type: 'string' },
  createdAt: { type: 'date', default: Date.now },
};

// Define methods for interacting with the database
const todoModel = {
  async create(todo) {
    const { title, description } = todo;
    const query = 'INSERT INTO todo (title, description) VALUES ($1, $2) RETURNING *';
    const values = [title, description];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async read() {
    const query = 'SELECT * FROM todo ORDER BY id ASC';
    const { rows } = await pool.query(query);
    return rows;
  },

  async update(id, todo) {
    const { title, description } = todo;
    const query = 'UPDATE todo SET title=$1, description=$2 WHERE id=$3 RETURNING *';
    const values = [title, description, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async delete(id) {
    const query = 'DELETE FROM todo WHERE id=$1 RETURNING *';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
};

module.exports = { todoSchema, todoModel };
