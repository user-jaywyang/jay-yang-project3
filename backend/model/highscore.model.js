import mongoose from 'mongoose';
import HighscoreSchema from '../schema/highscore.schema.js';

const HighscoreModel = mongoose.model('Highscore', HighscoreSchema);

export function addHighscore(entry) {
  return HighscoreModel.create(entry);
}

export function getAllHighscores() {
  return HighscoreModel.find().exec();
}

export function getHighscoresByGameId(gameId) {
  return HighscoreModel.find({ gameId }).exec();
}

export function deleteHighscoresByGameId(gameId) {
  return HighscoreModel.deleteMany({ gameId }).exec();
}