const mysql = require('mysql2/promise');

// Replace with your database credentials
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root@22@',
  database: process.env.DB_NAME || 'blog_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Optional: Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully!');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    // Exit process if cannot connect to DB during startup
    process.exit(1);
  }
}

// Call testConnection on module load
testConnection();

module.exports = pool;
