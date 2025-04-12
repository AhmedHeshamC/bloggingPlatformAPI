const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Find a user by their email address
exports.findByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await pool.query(sql, [email]);
  return rows[0]; // Return the user object or undefined
};

// Create a new user
exports.create = async (userData) => {
  const { name, email, password } = userData;

  // Hash the password before storing
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'); // Use env var or default
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const [result] = await pool.query(sql, [name, email, hashedPassword]);
  const insertedId = result.insertId;

  // Return the newly created user (without the password hash)
  const [newUserRows] = await pool.query('SELECT id, name, email, createdAt, updatedAt FROM users WHERE id = ?', [insertedId]);
  return newUserRows[0];
};

// Helper to compare passwords (used in authController)
exports.comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};
