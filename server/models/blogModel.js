import pool from '../config/db';

export const BlogModel = {
  /**
   * Parse JSON fields helper
   */
  _parseJsonFields(row) {
    if (!row) return row;
    
    // Parse tags
    if (typeof row.tags === 'string') {
      try {
        row.tags = JSON.parse(row.tags);
      } catch (e) {
        row.tags = [];
      }
    } else if (!row.tags) {
      row.tags = [];
    }

    // Convert booleans
    row.is_featured = Boolean(row.is_featured);
    row.is_recent = Boolean(row.is_recent);
    row.is_new = Boolean(row.is_new);

    return row;
  },

  /**
   * Fetch all blogs from the database, ordered by ID desc.
   * @returns {Promise<Array>} Array of blog objects.
   */
  async getAll() {
    const [rows] = await pool.execute('SELECT * FROM blogs ORDER BY id DESC');
    return rows.map(row => this._parseJsonFields(row));
  },

  /**
   * Fetch a single blog by unique database ID.
   * @param {number} id
   * @returns {Promise<object|null>} The blog object or null.
   */
  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM blogs WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) return null;
    return this._parseJsonFields(rows[0]);
  },

  /**
   * Insert a new blog into the database.
   * @param {object} data
   * @returns {Promise<number>} The inserted record's ID.
   */
  async create(data) {
    const tagsStr = Array.isArray(data.tags) ? JSON.stringify(data.tags) : '[]';
    const [result] = await pool.execute(
      `INSERT INTO blogs (
        title, excerpt, content, date, category, image, readTime, tags, 
        views, likes, comments, author, authorImage, is_featured, is_recent, is_new
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.title,
        data.excerpt || null,
        data.content || null,
        data.date || null,
        data.category || 'Entrance Prep',
        data.image || null,
        data.readTime || null,
        tagsStr,
        data.views !== undefined ? parseInt(data.views, 10) : 0,
        data.likes !== undefined ? parseInt(data.likes, 10) : 0,
        data.comments !== undefined ? parseInt(data.comments, 10) : 0,
        data.author || 'Suraj Khadka',
        data.authorImage || null,
        data.is_featured !== undefined ? (data.is_featured ? 1 : 0) : 1,
        data.is_recent !== undefined ? (data.is_recent ? 1 : 0) : 0,
        data.is_new !== undefined ? (data.is_new ? 1 : 0) : 0
      ]
    );
    return result.insertId;
  },

  /**
   * Update an existing blog record in the database.
   * @param {number} id
   * @param {object} data
   * @returns {Promise<boolean>} True if update succeeded.
   */
  async update(id, data) {
    const tagsStr = Array.isArray(data.tags) ? JSON.stringify(data.tags) : '[]';
    await pool.execute(
      `UPDATE blogs SET 
        title = ?, excerpt = ?, content = ?, date = ?, category = ?, image = ?, 
        readTime = ?, tags = ?, views = ?, likes = ?, comments = ?, author = ?, 
        authorImage = ?, is_featured = ?, is_recent = ?, is_new = ? 
      WHERE id = ?`,
      [
        data.title,
        data.excerpt || null,
        data.content || null,
        data.date || null,
        data.category || 'Entrance Prep',
        data.image || null,
        data.readTime || null,
        tagsStr,
        data.views !== undefined ? parseInt(data.views, 10) : 0,
        data.likes !== undefined ? parseInt(data.likes, 10) : 0,
        data.comments !== undefined ? parseInt(data.comments, 10) : 0,
        data.author || 'Suraj Khadka',
        data.authorImage || null,
        data.is_featured !== undefined ? (data.is_featured ? 1 : 0) : 1,
        data.is_recent !== undefined ? (data.is_recent ? 1 : 0) : 0,
        data.is_new !== undefined ? (data.is_new ? 1 : 0) : 0,
        id
      ]
    );
    return true;
  },

  /**
   * Delete a blog record from the database.
   * @param {number} id
   * @returns {Promise<boolean>} True if delete succeeded.
   */
  async delete(id) {
    await pool.execute('DELETE FROM blogs WHERE id = ?', [id]);
    return true;
  }
};
