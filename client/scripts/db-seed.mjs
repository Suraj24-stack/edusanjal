import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { schoolsData } from '../src/app/data/schoolsData.js';

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

    // 2. Create colleges table with details
    await connection.query(`
      CREATE TABLE IF NOT EXISTS colleges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        level VARCHAR(100) NOT NULL,
        ranking INT DEFAULT NULL,
        tuition VARCHAR(100) DEFAULT NULL,
        acceptance VARCHAR(50) DEFAULT NULL,
        students VARCHAR(50) DEFAULT NULL,
        image TEXT DEFAULT NULL,
        description TEXT DEFAULT NULL,
        established INT DEFAULT NULL,
        programs JSON DEFAULT NULL,
        boardingType VARCHAR(100) DEFAULT NULL,
        showInSchoolList BOOLEAN DEFAULT FALSE,
        showInCollegeList BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Ensured colleges table exists');

    // Check if colleges table has any data
    const [collegeRows] = await connection.query('SELECT COUNT(*) as count FROM colleges');
    if (collegeRows[0].count === 0) {
      console.log('Seeding initial colleges data...');
      for (const school of schoolsData) {
        await connection.query(
          `INSERT INTO colleges (
            id, name, location, type, level, ranking, tuition, acceptance, students, 
            image, description, established, programs, boardingType, showInSchoolList, showInCollegeList
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            school.id,
            school.name,
            school.location,
            school.type,
            school.level || (school.showInCollegeList ? 'College' : 'School'),
            school.ranking,
            school.tuition,
            school.acceptance,
            school.students,
            school.image,
            school.description,
            school.established,
            JSON.stringify(school.programs || []),
            school.boardingType,
            school.showInSchoolList ? 1 : 0,
            school.showInCollegeList ? 1 : 0
          ]
        );
      }
      console.log(`Seeded ${schoolsData.length} colleges successfully!`);
    } else {
      console.log('Colleges table already seeded.');
    }

    // 3. Create users table with role if not exists
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
