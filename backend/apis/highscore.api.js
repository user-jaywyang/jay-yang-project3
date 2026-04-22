import express from 'express';
import { requireAuth } from '../utils/auth.js';
import {
  addHighscore, getAllHighscores, getHighscoresByGameId
} from '../model/highscore.model.js';

const router = express.Router();

// GET /api/highscore; return sorted high score list (username + win count)
router.get('/', async function (req, res) {
  try {
    const allScores = await getAllHighscores();

    // Aggregate: count wins per username
    const winCounts = {};
    for (const entry of allScores) {
      if (!winCounts[entry.username]) {
        winCounts[entry.username] = 0;
      }
      winCounts[entry.username]++;
    }

    // Convert to array, filter out 0 wins, sort by wins desc then username asc
    const sorted = Object.entries(winCounts)
      .map(([username, wins]) => ({ username, wins }))
      .filter(entry => entry.wins > 0)
      .sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;
        return a.username.localeCompare(b.username);
      });

    return res.status(200).send(sorted);
  } catch (err) {
    return res.status(500).send({ error: 'Failed to get highscores: ' + err.message });
  }
});

// POST /api/highscore; record a win (requires auth)
router.post('/', requireAuth, async function (req, res) {
  const { gameId, gameName, completionTime } = req.body;

  if (!gameId || completionTime === undefined) {
    return res.status(400).send({ error: 'gameId and completionTime are required' });
  }

  try {
    const entry = await addHighscore({
      gameId,
      gameName: gameName || '',
      username: req.username,
      completionTime,
    });
    return res.status(200).send(entry);
  } catch (err) {
    return res.status(500).send({ error: 'Failed to add highscore: ' + err.message });
  }
});

// GET /api/highscore/:gameId; return highscore for specific game
router.get('/:gameId', async function (req, res) {
  try {
    const scores = await getHighscoresByGameId(req.params.gameId);
    return res.status(200).send(scores);
  } catch (err) {
    return res.status(500).send({ error: 'Failed to get highscore: ' + err.message });
  }
});

export default router;