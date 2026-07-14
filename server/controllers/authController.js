import bcrypt from 'bcryptjs';
import { UserModel } from '../models/userModel';
import { signToken, verifyToken } from '../utils/jwt';

export const AuthController = {
  /**
   * Register a new user in the system.
   * @param {object} params
   * @param {string} params.name
   * @param {string} params.email
   * @param {string} params.password
   */
  async registerUser({ name, email, password }) {
    // 1. Validation
    if (!name || !email || !password) {
      return { success: false, status: 400, message: 'All fields are required' };
    }

    if (password.length < 6) {
      return { success: false, status: 400, message: 'Password must be at least 6 characters' };
    }

    try {
      // 2. Check if email is already registered
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return { success: false, status: 409, message: 'Email is already registered' };
      }

      // 3. Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 4. Save user to database
      const userId = await UserModel.create(name, email, hashedPassword);

      return {
        success: true,
        status: 201,
        message: 'Registration successful',
        userId
      };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, status: 500, message: 'Failed to register user. Database error.' };
    }
  },

  /**
   * Log in an existing user.
   * @param {object} params
   * @param {string} params.email
   * @param {string} params.password
   */
  async loginUser({ email, password }) {
    // 1. Validation
    if (!email || !password) {
      return { success: false, status: 400, message: 'Email and password are required' };
    }

    try {
      // 2. Find user by email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return { success: false, status: 401, message: 'Invalid email or password' };
      }

      // 3. Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: false, status: 401, message: 'Invalid email or password' };
      }

      // 4. Generate JWT
      const token = signToken({ id: user.id });

      return {
        success: true,
        status: 200,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, status: 500, message: 'Failed to login. Database error.' };
    }
  },

  /**
   * Validate a session token and fetch user details.
   * @param {string} token - The session JWT token.
   */
  async getUserSession(token) {
    if (!token) {
      return { success: false, status: 401, message: 'No active session' };
    }

    // 1. Verify token
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return { success: false, status: 401, message: 'Invalid or expired session token' };
    }

    try {
      // 2. Fetch user information
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return { success: false, status: 404, message: 'User not found' };
      }

      return {
        success: true,
        status: 200,
        user
      };
    } catch (error) {
      console.error('Session retrieval error:', error);
      return { success: false, status: 500, message: 'Failed to retrieve session. Database error.' };
    }
  }
};
