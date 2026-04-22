import { Schema } from 'mongoose';

const HighscoreSchema = new Schema({
  gameId: { type: String, required: true },
  gameName: { type: String },
  username: { type: String, required: true },
  completionTime: { type: Number, required: true }, // seconds
  completedAt: { type: Date, default: Date.now },
}, { collection: 'sudonku_highscores' });

export default HighscoreSchema;