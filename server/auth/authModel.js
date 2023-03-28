const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const userModel = {
  async create(user) {
    const { username, password } = user;
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [username, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findOne(filter) {
    const query = 'SELECT * FROM users WHERE username=$1';
    const values = [filter.username];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
};

module.exports = userModel;
