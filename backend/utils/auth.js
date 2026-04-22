// JWT cookie middleware pattern from: course lecture (Hunter Jorgenson)
// (ajorgense1-chwy/cookie.js and ahjorgen167/auth.helper.js)
import jwt from 'jsonwebtoken';

const SECRET = process.env.SUPER_SECRET || 'sudonku_secret_key_2026';

// Middleware: extracts username from JWT cookie, attaches to req.username
// Sends 401 if no valid token
export function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized: No token' });
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.username = decoded.username;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Unauthorized: Invalid token' });
  }
}

// Helper: sign a JWT with username payload
export function signToken(username) {
  return jwt.sign({ username }, SECRET, { expiresIn: '14d' });
}

export { SECRET };