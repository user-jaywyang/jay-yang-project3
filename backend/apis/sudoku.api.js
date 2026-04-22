// CRUD route pattern from: cs5610_spr23_mod3/backend/apis/pokemon.js
// Auth middleware pattern from: course lecture (Hunter Jorgenson, Updated Pokemon Controller)
import express from 'express';
import { requireAuth } from '../utils/auth.js';
import { generatePuzzle } from '../utils/generatePuzzle.js';
import { generateGameName } from '../utils/words.js';
import {
  createGame, getAllGames, getGameById, updateGame, deleteGame
} from '../model/sudoku.model.js';
import { deleteHighscoresByGameId } from '../model/highscore.model.js';

const router = express.Router();

// GET /api/sudoku; return list of all games
router.get('/', async function (req, res) {
  try {
    const games = await getAllGames();
    return res.status(200).send(games);
  } catch (err) {
    return res.status(500).send({ error: 'Failed to get games: ' + err.message });
  }
});

// POST /api/sudoku; create a new game (requires auth)
router.post('/', requireAuth, async function (req, res) {
  const { difficulty } = req.body;

  if (difficulty !== 'easy' && difficulty !== 'normal') {
    return res.status(400).send({ error: 'Difficulty must be "easy" or "normal"' });
  }

  try {
    const puzzle = generatePuzzle(difficulty);
    const name = generateGameName();

    const game = await createGame({
      name,
      difficulty,
      size: puzzle.size,
      board: puzzle.board,
      solution: puzzle.solution,
      initial: puzzle.initial,
      creator: req.username,
    });

    return res.status(200).send({ gameId: game._id, name: game.name });
  } catch (err) {
    return res.status(500).send({ error: 'Failed to create game: ' + err.message });
  }
});

// GET /api/sudoku/:gameId; return full game data
router.get('/:gameId', async function (req, res) {
  try {
    const game = await getGameById(req.params.gameId);
    if (!game) {
      return res.status(404).send({ error: 'Game not found' });
    }
    return res.status(200).send(game);
  } catch (err) {
    return res.status(500).send({ error: 'Failed to get game: ' + err.message });
  }
});

// PUT /api/sudoku/:gameId; update game state (requires auth)
router.put('/:gameId', requireAuth, async function (req, res) {
  try {
    const game = await getGameById(req.params.gameId);
    if (!game) {
      return res.status(404).send({ error: 'Game not found' });
    }

    const updates = {};
    if (req.body.board) updates.board = req.body.board;
    if (req.body.completed !== undefined) updates.completed = req.body.completed;
    if (req.body.completedBy) updates.completedBy = req.body.completedBy;

    const updated = await updateGame(req.params.gameId, updates);
    return res.status(200).send(updated);
  } catch (err) {
    return res.status(500).send({ error: 'Failed to update game: ' + err.message });
  }
});

// DELETE /api/sudoku/:gameId; delete game (requires auth)
router.delete('/:gameId', requireAuth, async function (req, res) {
  try {
    const game = await getGameById(req.params.gameId);
    if (!game) {
      return res.status(404).send({ error: 'Game not found' });
    }

    // Also remove associated highscores
    await deleteHighscoresByGameId(req.params.gameId);
    await deleteGame(req.params.gameId);

    return res.status(200).send({ message: 'Game deleted' });
  } catch (err) {
    return res.status(500).send({ error: 'Failed to delete game: ' + err.message });
  }
});

export default router;