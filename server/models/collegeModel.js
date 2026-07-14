import pool from '../config/db';

export const CollegeModel = {
  /**
   * Fetch all institutions from the database, ordered by ID desc.
   * @returns {Promise<Array>} Array of college objects.
   */
  async getAll() {
    const [rows] = await pool.execute('SELECT * FROM colleges ORDER BY id DESC');
    return rows.map(row => {
      if (typeof row.programs === 'string') {
        try {
          row.programs = JSON.parse(row.programs);
        } catch (e) {
          row.programs = [];
        }
      }
      row.showInSchoolList = Boolean(row.showInSchoolList);
      row.showInCollegeList = Boolean(row.showInCollegeList);
      return row;
    });
  },

  /**
   * Fetch a single institution by unique database ID.
   * @param {number} id
   * @returns {Promise<object|null>} The college object or null.
   */
  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM colleges WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    if (typeof row.programs === 'string') {
      try {
        row.programs = JSON.parse(row.programs);
      } catch (e) {
        row.programs = [];
      }
    }
    row.showInSchoolList = Boolean(row.showInSchoolList);
    row.showInCollegeList = Boolean(row.showInCollegeList);
    return row;
  },

  /**
   * Insert a new institution into the database.
   * @param {object} data
   * @returns {Promise<number>} The inserted record's ID.
   */
  async create(data) {
    const programsStr = Array.isArray(data.programs) ? JSON.stringify(data.programs) : '[]';
    const [result] = await pool.execute(
      `INSERT INTO colleges (
        name, location, type, level, ranking, tuition, acceptance, students, image, 
        description, established, programs, boardingType, showInSchoolList, showInCollegeList
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.location,
        data.type || 'Private',
        data.level || 'College',
        data.ranking !== undefined ? parseInt(data.ranking, 10) : null,
        data.tuition || null,
        data.acceptance || null,
        data.students || null,
        data.image || null,
        data.description || null,
        data.established !== undefined ? parseInt(data.established, 10) : null,
        programsStr,
        data.boardingType || null,
        data.showInSchoolList ? 1 : 0,
        data.showInCollegeList ? 1 : 0
      ]
    );
    return result.insertId;
  },

  /**
   * Update an existing institution record in the database.
   * @param {number} id
   * @param {object} data
   * @returns {Promise<boolean>} True if update succeeded.
   */
  async update(id, data) {
    const programsStr = Array.isArray(data.programs) ? JSON.stringify(data.programs) : '[]';
    await pool.execute(
      `UPDATE colleges SET 
        name = ?, location = ?, type = ?, level = ?, ranking = ?, tuition = ?, 
        acceptance = ?, students = ?, image = ?, description = ?, established = ?, 
        programs = ?, boardingType = ?, showInSchoolList = ?, showInCollegeList = ? 
      WHERE id = ?`,
      [
        data.name,
        data.location,
        data.type || 'Private',
        data.level || 'College',
        data.ranking !== undefined ? parseInt(data.ranking, 10) : null,
        data.tuition || null,
        data.acceptance || null,
        data.students || null,
        data.image || null,
        data.description || null,
        data.established !== undefined ? parseInt(data.established, 10) : null,
        programsStr,
        data.boardingType || null,
        data.showInSchoolList ? 1 : 0,
        data.showInCollegeList ? 1 : 0,
        id
      ]
    );
    return true;
  },

  /**
   * Delete an institution record from the database.
   * @param {number} id
   * @returns {Promise<boolean>} True if delete succeeded.
   */
  async delete(id) {
    await pool.execute('DELETE FROM colleges WHERE id = ?', [id]);
    return true;
  }
};
