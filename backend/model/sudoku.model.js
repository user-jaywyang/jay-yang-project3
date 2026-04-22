// Model pattern from: course lecture demo file (ahjorgen167/pokemon.model.js)
import mongoose from 'mongoose';
import SudokuSchema from '../schema/sudoku.schema.js';

const SudokuModel = mongoose.model('Sudoku', SudokuSchema);

export function createGame(game) {
  return SudokuModel.create(game);
}

export function getAllGames() {
  return SudokuModel.find({}, {
    name: 1, difficulty: 1, creator: 1, createdAt: 1, completed: 1
  }).exec();
}

export function getGameById(id) {
  return SudokuModel.findById(id).exec();
}

export function updateGame(id, updates) {
  return SudokuModel.findByIdAndUpdate(id, updates, { new: true }).exec();
}

export function deleteGame(id) {
  return SudokuModel.findByIdAndDelete(id).exec();
}