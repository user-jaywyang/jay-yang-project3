// Schema pattern from: course lecture demo file (ahjorgen167/pokemon.schema.js)
import { Schema } from 'mongoose';

const SudokuSchema = new Schema({
  name: { type: String, required: true },
  difficulty: { type: String, required: true }, // "easy" or "normal"
  size: { type: Number, required: true },       // 6 or 9
  board: [[Number]],                            // current state
  solution: [[Number]],                         // solved board
  initial: [[Number]],                          // starting state (for reset)
  creator: { type: String, required: true },    // username who created it
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  completedBy: { type: String, default: null },
}, { collection: 'sudonku_games' });

export default SudokuSchema;