import { BlogModel } from '../models/blogModel';

export const BlogController = {
  /**
   * Get all blogs.
   */
  async getAllBlogs() {
    try {
      const blogs = await BlogModel.getAll();
      return { success: true, blogs, status: 200 };
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return { success: false, message: 'Failed to fetch blogs', status: 500 };
    }
  },

  /**
   * Get a single blog by ID.
   */
  async getBlogById(id) {
    try {
      const blog = await BlogModel.getById(id);
      if (!blog) {
        return { success: false, message: 'Blog not found', status: 404 };
      }
      return { success: true, blog, status: 200 };
    } catch (error) {
      console.error('Error fetching blog details:', error);
      return { success: false, message: 'Failed to fetch blog details', status: 500 };
    }
  },

  /**
   * Create a new blog post.
   */
  async createBlog(data) {
    try {
      if (!data.title || !data.category) {
        return { success: false, message: 'Title and Category are required fields', status: 400 };
      }
      const newId = await BlogModel.create(data);
      return { success: true, message: 'Blog created successfully', id: newId, status: 201 };
    } catch (error) {
      console.error('Error creating blog:', error);
      return { success: false, message: 'Failed to create blog', status: 500 };
    }
  },

  /**
   * Update an existing blog post.
   */
  async updateBlog(id, data) {
    try {
      if (!data.title || !data.category) {
        return { success: false, message: 'Title and Category are required fields', status: 400 };
      }
      const existing = await BlogModel.getById(id);
      if (!existing) {
        return { success: false, message: 'Blog not found', status: 404 };
      }
      await BlogModel.update(id, data);
      return { success: true, message: 'Blog updated successfully', status: 200 };
    } catch (error) {
      console.error('Error updating blog:', error);
      return { success: false, message: 'Failed to update blog', status: 500 };
    }
  },

  /**
   * Delete a blog post.
   */
  async deleteBlog(id) {
    try {
      const existing = await BlogModel.getById(id);
      if (!existing) {
        return { success: false, message: 'Blog not found', status: 404 };
      }
      await BlogModel.delete(id);
      return { success: true, message: 'Blog deleted successfully', status: 200 };
    } catch (error) {
      console.error('Error deleting blog:', error);
      return { success: false, message: 'Failed to delete blog', status: 500 };
    }
  }
};
