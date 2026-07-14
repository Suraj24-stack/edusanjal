import pool from '../config/db';

export const UserModel = {
  /**
   * Create a new user in the database.
   * @param {string} name
   * @param {string} email
   * @param {string} hashedPassword
   * @returns {Promise<number>} Inserted user ID
   */
  async create(name, email, hashedPassword) {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    return result.insertId;
  },

  /**
   * Find a user by their email address.
   * @param {string} email
   * @returns {Promise<object|null>} User object or null
   */
  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, password, created_at FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0] || null;
  },

  /**
   * Find a user by their unique database ID.
   * @param {number} id
   * @returns {Promise<object|null>} User object (without password) or null
   */
  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  }
};
