// Base structure from: cs5610_project3_template/server.js
// API mounting pattern from: cs5610_spr23_mod3/backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';

import sudokuApi from './backend/apis/sudoku.api.js';
import userApi from './backend/apis/user.api.js';
import highscoreApi from './backend/apis/highscore.api.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
// Replace with your MongoDB Atlas connection string
// On Render, set this as the MONGO environment variable
const MONGODB_URL = process.env.MONGO || 'mongodb+srv://jay_db_user:v3UobsRrOaact46X@sudonku.yggmgh9.mongodb.net/?appName=SuDONKu';
mongoose.connect(MONGODB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

// API routes
app.use('/api/sudoku', sudokuApi);
app.use('/api/user', userApi);
app.use('/api/highscore', highscoreApi);

// Serve built frontend
const frontend_dir = path.join(path.resolve(), 'dist');
app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
  res.sendFile(path.join(frontend_dir, 'index.html'));
});

app.listen(process.env.PORT || 8000, function () {
  console.log('Starting server on port ' + (process.env.PORT || 8000));
});