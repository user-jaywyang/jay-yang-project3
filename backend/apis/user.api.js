// Auth flow pattern from: cs5610_spr23_mod3/backend/apis/user.js
// JWT cookie pattern from: course lecture (Hunter Jorgenson, Setting JWT Token on Login)
import express from 'express';
import bcrypt from 'bcrypt';
import { createUser, findUserByUsername } from '../model/user.model.js';
import { signToken } from '../utils/auth.js';

const router = express.Router();
const SALT_ROUNDS = 10;

// POST /api/user/register
router.post('/register', async function (req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ error: 'Username and password are required' });
  }

  try {
    // Check if user already exists
    const existing = await findUserByUsername(username);
    if (existing) {
      return res.status(409).send({ error: 'Username already exists' });
    }

    // Hash password (bonus: password encryption)
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await createUser({ username, password: hashedPassword });

    const token = signToken(username);
    res.cookie('token', token, { httpOnly: true });
    return res.status(200).send({ username });
  } catch (err) {
    return res.status(500).send({ error: 'Failed to register: ' + err.message });
  }
});

// POST /api/user/login
router.post('/login', async function (req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ error: 'Username and password are required' });
  }

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).send({ error: 'Invalid username or password' });
    }

    // Compare hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({ error: 'Invalid username or password' });
    }

    const token = signToken(username);
    res.cookie('token', token, { httpOnly: true });
    return res.status(200).send({ username });
  } catch (err) {
    return res.status(500).send({ error: 'Failed to login: ' + err.message });
  }
});

// GET /api/user/isLoggedIn
router.get('/isLoggedIn', async function (req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.send({ username: null });
  }

  try {
    const jwt = await import('jsonwebtoken');
    const SECRET = process.env.SUPER_SECRET || 'sudonku_secret_key_2026';
    const decoded = jwt.default.verify(token, SECRET);
    return res.send({ username: decoded.username });
  } catch (err) {
    return res.send({ username: null });
  }
});

// POST /api/user/logout
router.post('/logout', async function (req, res) {
  res.cookie('token', '', { maxAge: 0, httpOnly: true });
  return res.status(200).send({ message: 'Logged out' });
});

export default router;