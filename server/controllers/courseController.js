import { CourseModel } from '../models/courseModel';

export const CourseController = {
  /**
   * Get all courses.
   */
  async getAllCourses() {
    try {
      const courses = await CourseModel.getAll();
      return { success: true, courses, status: 200 };
    } catch (error) {
      console.error('Error fetching courses:', error);
      return { success: false, message: 'Failed to fetch courses', status: 500 };
    }
  },

  /**
   * Get a single course by ID.
   */
  async getCourseById(id) {
    try {
      const course = await CourseModel.getById(id);
      if (!course) {
        return { success: false, message: 'Course not found', status: 404 };
      }
      return { success: true, course, status: 200 };
    } catch (error) {
      console.error('Error fetching course details:', error);
      return { success: false, message: 'Failed to fetch course details', status: 500 };
    }
  },

  /**
   * Create a new course.
   */
  async createCourse(data) {
    try {
      if (!data.title || !data.level || !data.duration || !data.field) {
        return { success: false, message: 'Title, Level, Duration, and Field are required fields', status: 400 };
      }
      const newId = await CourseModel.create(data);
      return { success: true, message: 'Course created successfully', id: newId, status: 201 };
    } catch (error) {
      console.error('Error creating course:', error);
      return { success: false, message: 'Failed to create course', status: 500 };
    }
  },

  /**
   * Update an existing course.
   */
  async updateCourse(id, data) {
    try {
      if (!data.title || !data.level || !data.duration || !data.field) {
        return { success: false, message: 'Title, Level, Duration, and Field are required fields', status: 400 };
      }
      const existing = await CourseModel.getById(id);
      if (!existing) {
        return { success: false, message: 'Course not found', status: 404 };
      }
      await CourseModel.update(id, data);
      return { success: true, message: 'Course updated successfully', status: 200 };
    } catch (error) {
      console.error('Error updating course:', error);
      return { success: false, message: 'Failed to update course', status: 500 };
    }
  },

  /**
   * Delete a course.
   */
  async deleteCourse(id) {
    try {
      const existing = await CourseModel.getById(id);
      if (!existing) {
        return { success: false, message: 'Course not found', status: 404 };
      }
      await CourseModel.delete(id);
      return { success: true, message: 'Course deleted successfully', status: 200 };
    } catch (error) {
      console.error('Error deleting course:', error);
      return { success: false, message: 'Failed to delete course', status: 500 };
    }
  }
};
