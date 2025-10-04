/**
 * Generate bcrypt hashes for seed data
 */

const bcrypt = require('bcrypt');

const users = [
  { name: 'Admin User', email: 'admin@blogplatform.com', password: 'admin123' },
  { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password123' },
  { name: 'Mike Johnson', email: 'mike.johnson@example.com', password: 'password123' },
  { name: 'Sarah Wilson', email: 'sarah.wilson@example.com', password: 'password123' }
];

async function generateHashes() {
  const saltRounds = 10;

  console.log('Generating bcrypt hashes...');

  for (const user of users) {
    try {
      const hash = await bcrypt.hash(user.password, saltRounds);
      console.log(`User: ${user.name}`);
      console.log(`Email: ${user.email}`);
      console.log(`Hash: ${hash}`);
      console.log('---');
    } catch (error) {
      console.error('Error generating hash:', error);
    }
  }
}

generateHashes();