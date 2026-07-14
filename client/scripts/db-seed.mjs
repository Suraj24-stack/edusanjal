import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

// Setup connection details using environment variables or fallback to defaults
const connectionConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '8889', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
};

async function seed() {
  let connection;
  try {
    console.log('Connecting to MySQL...');
    connection = await mysql.createConnection(connectionConfig);

    // 1. Create database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS edulink');
    await connection.query('USE edulink');
    console.log('Using database edulink');

    // 2. Create users table with role if not exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Ensured users table exists');

    // Check if role column exists (in case users table already existed without it)
    const [columns] = await connection.query('SHOW COLUMNS FROM users LIKE "role"');
    if (columns.length === 0) {
      console.log('Adding role column to users table...');
      await connection.query('ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT "user"');
    }

    // 3. Seed admin@edulink.com
    const adminEmail = 'admin@edulink.com';
    const adminPassword = 'Admin@12345';
    const adminName = 'Administrator';
    const adminRole = 'admin';

    const [existing] = await connection.query('SELECT * FROM users WHERE email = ?', [adminEmail]);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    if (existing.length > 0) {
      console.log('Admin user exists. Updating password and role...');
      await connection.query(
        'UPDATE users SET password = ?, role = ?, name = ? WHERE email = ?',
        [hashedPassword, adminRole, adminName, adminEmail]
      );
    } else {
      console.log('Creating admin user...');
      await connection.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [adminName, adminEmail, hashedPassword, adminRole]
      );
    }

    console.log('Admin seeded successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seed();
