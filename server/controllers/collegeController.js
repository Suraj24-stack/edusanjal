import { CollegeModel } from '../models/collegeModel';

export const CollegeController = {
  /**
   * Get all colleges/schools.
   */
  async getAllColleges() {
    try {
      const colleges = await CollegeModel.getAll();
      return { success: true, colleges, status: 200 };
    } catch (error) {
      console.error('Error fetching colleges:', error);
      return { success: false, message: 'Failed to fetch colleges', status: 500 };
    }
  },

  /**
   * Get a single college/school by ID.
   */
  async getCollegeById(id) {
    try {
      const college = await CollegeModel.getById(id);
      if (!college) {
        return { success: false, message: 'College not found', status: 404 };
      }
      return { success: true, college, status: 200 };
    } catch (error) {
      console.error('Error fetching college details:', error);
      return { success: false, message: 'Failed to fetch college details', status: 500 };
    }
  },

  /**
   * Create a new college/school.
   */
  async createCollege(data) {
    try {
      if (!data.name || !data.location) {
        return { success: false, message: 'Name and Location are required fields', status: 400 };
      }
      const newId = await CollegeModel.create(data);
      return { success: true, message: 'College created successfully', id: newId, status: 201 };
    } catch (error) {
      console.error('Error creating college:', error);
      return { success: false, message: 'Failed to create college', status: 500 };
    }
  },

  /**
   * Update an existing college/school.
   */
  async updateCollege(id, data) {
    try {
      if (!data.name || !data.location) {
        return { success: false, message: 'Name and Location are required fields', status: 400 };
      }
      const existing = await CollegeModel.getById(id);
      if (!existing) {
        return { success: false, message: 'College not found', status: 404 };
      }
      await CollegeModel.update(id, data);
      return { success: true, message: 'College updated successfully', status: 200 };
    } catch (error) {
      console.error('Error updating college:', error);
      return { success: false, message: 'Failed to update college', status: 500 };
    }
  },

  /**
   * Delete a college/school.
   */
  async deleteCollege(id) {
    try {
      const existing = await CollegeModel.getById(id);
      if (!existing) {
        return { success: false, message: 'College not found', status: 404 };
      }
      await CollegeModel.delete(id);
      return { success: true, message: 'College deleted successfully', status: 200 };
    } catch (error) {
      console.error('Error deleting college:', error);
      return { success: false, message: 'Failed to delete college', status: 500 };
    }
  }
};
