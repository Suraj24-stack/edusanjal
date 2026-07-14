import pool from '../config/db';

export const CourseModel = {
  /**
   * Parse JSON fields helper
   */
  _parseJsonFields(row) {
    if (!row) return row;
    
    // Parse careers
    if (typeof row.careers === 'string') {
      try {
        row.careers = JSON.parse(row.careers);
      } catch (e) {
        row.careers = [];
      }
    } else if (!row.careers) {
      row.careers = [];
    }

    // Parse requirements
    if (typeof row.requirements === 'string') {
      try {
        row.requirements = JSON.parse(row.requirements);
      } catch (e) {
        row.requirements = [];
      }
    } else if (!row.requirements) {
      row.requirements = [];
    }

    // Parse universities
    if (typeof row.universities === 'string') {
      try {
        row.universities = JSON.parse(row.universities);
      } catch (e) {
        row.universities = [];
      }
    } else if (!row.universities) {
      row.universities = [];
    }

    return row;
  },

  /**
   * Fetch all courses from the database.
   */
  async getAll() {
    const [rows] = await pool.execute('SELECT * FROM courses ORDER BY id DESC');
    return rows.map(row => this._parseJsonFields(row));
  },

  /**
   * Fetch a single course by unique database ID.
   */
  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) return null;
    return this._parseJsonFields(rows[0]);
  },

  /**
   * Insert a new course into the database.
   */
  async create(data) {
    const careersStr = Array.isArray(data.careers) ? JSON.stringify(data.careers) : '[]';
    const requirementsStr = Array.isArray(data.requirements) ? JSON.stringify(data.requirements) : '[]';
    const universitiesStr = Array.isArray(data.universities) ? JSON.stringify(data.universities) : '[]';

    const [result] = await pool.execute(
      `INSERT INTO courses (
        title, level, duration, field, ranking, avgSalary, jobGrowth, difficulty, 
        students, image, description, established, careers, requirements, universities
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.title,
        data.level,
        data.duration,
        data.field,
        data.ranking !== undefined && data.ranking !== null ? parseInt(data.ranking, 10) : null,
        data.avgSalary || null,
        data.jobGrowth || null,
        data.difficulty || 'Medium',
        data.students || null,
        data.image || null,
        data.description || null,
        data.established || null,
        careersStr,
        requirementsStr,
        universitiesStr
      ]
    );
    return result.insertId;
  },

  /**
   * Update an existing course record in the database.
   */
  async update(id, data) {
    const careersStr = Array.isArray(data.careers) ? JSON.stringify(data.careers) : '[]';
    const requirementsStr = Array.isArray(data.requirements) ? JSON.stringify(data.requirements) : '[]';
    const universitiesStr = Array.isArray(data.universities) ? JSON.stringify(data.universities) : '[]';

    await pool.execute(
      `UPDATE courses SET 
        title = ?, level = ?, duration = ?, field = ?, ranking = ?, avgSalary = ?, 
        jobGrowth = ?, difficulty = ?, students = ?, image = ?, description = ?, 
        established = ?, careers = ?, requirements = ?, universities = ? 
      WHERE id = ?`,
      [
        data.title,
        data.level,
        data.duration,
        data.field,
        data.ranking !== undefined && data.ranking !== null ? parseInt(data.ranking, 10) : null,
        data.avgSalary || null,
        data.jobGrowth || null,
        data.difficulty || 'Medium',
        data.students || null,
        data.image || null,
        data.description || null,
        data.established || null,
        careersStr,
        requirementsStr,
        universitiesStr,
        id
      ]
    );
    return true;
  },

  /**
   * Delete a course record from the database.
   */
  async delete(id) {
    await pool.execute('DELETE FROM courses WHERE id = ?', [id]);
    return true;
  }
};
