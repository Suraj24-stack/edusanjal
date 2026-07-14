import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_edulink_mvc_auth_2026';

/**
 * Sign a payload and return a JWT token.
 * @param {object} payload - The token payload.
 * @param {string|number} expiresIn - Token expiration description (default 7 days).
 * @returns {string} Signed JWT token
 */
export function signToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify a JWT token and return decoded payload.
 * @param {string} token - The JWT token to verify.
 * @returns {object|null} Decoded payload or null if invalid/expired
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
