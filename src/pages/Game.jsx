import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import Board from '../components/Board.jsx';
import Timer from '../components/Timer.jsx';
import GameControls from '../components/GameControls.jsx';
import CongratsMessage from '../components/CongratsMessage.jsx';
import { findErrors, isBoardComplete } from '../utils/validation.js';

function Game() {
  const { gameId } = useParams();
  const { username } = useAuth();

  const [gameData, setGameData] = useState(null);
  const [board, setBoard] = useState([]);
  const [initial, setInitial] = useState([]);
  const [solution, setSolution] = useState([]);
  const [size, setSize] = useState(9);
  const [errors, setErrors] = useState(new Set());
  const [selectedCell, setSelectedCell] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hintCell, setHintCell] = useState(null);
  const [noHints, setNoHints] = useState(false);

  // Load game from API
  useEffect(() => {
    const loadGame = async () => {
      try {
        const res = await axios.get(`/api/sudoku/${gameId}`);
        const g = res.data;
        setGameData(g);
        setBoard(g.board.map(row => [...row]));
        setInitial(g.initial.map(row => [...row]));
        setSolution(g.solution.map(row => [...row]));
        setSize(g.size);
        setIsComplete(g.completed || false);
        setTimerRunning(!g.completed);
        setErrors(findErrors(g.board, g.size));
      } catch (err) {
        console.error('Failed to load game:', err);
      }
      setLoading(false);
    };
    loadGame();
  }, [gameId]);

  // Timer
  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  // Cell click
  const handleSelectCell = useCallback((row, col) => {
    if (isComplete || !username) return;
    setSelectedCell({ row, col });
    setHintCell(null);
  }, [isComplete, username]);

  // Cell input
  const handleSetCell = useCallback((row, col, value) => {
    if (isComplete || !username) return;
    if (initial[row][col] !== 0) return;

    const num = parseInt(value, 10);
    if (isNaN(num) || num < 1 || num > size) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = num;
    setBoard(newBoard);

    const newErrors = findErrors(newBoard, size);
    setErrors(newErrors);
    setHintCell(null);
    setNoHints(false);

    if (isBoardComplete(newBoard, size)) {
      setIsComplete(true);
      setTimerRunning(false);
      // Save completion to backend
      axios.put(`/api/sudoku/${gameId}`, {
        board: newBoard,
        completed: true,
        completedBy: username,
      }).catch(err => console.error('Failed to save completion:', err));

      // Record highscore
      axios.post('/api/highscore', {
        gameId,
        gameName: gameData?.name || '',
        completionTime: timerSeconds,
      }).catch(err => console.error('Failed to record highscore:', err));
    }
  }, [isComplete, username, initial, board, size, gameId, gameData, timerSeconds]);

  // Cell clear
  const handleClearCell = useCallback((row, col) => {
    if (isComplete || !username) return;
    if (initial[row][col] !== 0) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = 0;
    setBoard(newBoard);
    setErrors(findErrors(newBoard, size));
    setHintCell(null);
    setNoHints(false);
  }, [isComplete, username, initial, board, size]);

  // Reset
  const handleReset = useCallback(() => {
    if (!username) return;
    const resetBoard = initial.map(r => [...r]);
    setBoard(resetBoard);
    setErrors(new Set());
    setSelectedCell(null);
    setTimerSeconds(0);
    setTimerRunning(true);
    setIsComplete(false);
    setHintCell(null);
    setNoHints(false);
  }, [username, initial]);

  // Hint: find naked single (same logic from Project 2)
  const handleHint = useCallback(() => {
    if (isComplete || !username) return;

    // Import isValid dynamically to check candidates
    const candidates = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (board[r][c] !== 0) continue;
        const validNums = [];
        for (let n = 1; n <= size; n++) {
          if (isValidPlacement(board, r, c, n, size)) {
            validNums.push(n);
          }
        }
        if (validNums.length === 1) {
          candidates.push({ row: r, col: c });
        }
      }
    }

    if (candidates.length === 0) {
      setNoHints(true);
      setHintCell(null);
      return;
    }

    const hint = candidates[Math.floor(Math.random() * candidates.length)];
    setHintCell({ row: hint.row, col: hint.col });
    setNoHints(false);
  }, [isComplete, username, board, size]);

  // Delete game (bonus feature)
  const handleDelete = useCallback(async () => {
    if (!username || !gameData) return;
    try {
      await axios.delete(`/api/sudoku/${gameId}`);
      window.location.href = '/games';
    } catch (err) {
      console.error('Failed to delete game:', err);
    }
  }, [username, gameData, gameId]);

  if (loading) {
    return (
      <div className="window-frame">
        <div className="page-title-bar">SuDONKu - <span>Loading...</span></div>
        <div className="window-body">
          <p className="page-description">Loading game...</p>
        </div>
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="window-frame">
        <div className="page-title-bar">SuDONKu - <span>Error</span></div>
        <div className="window-body">
          <p className="page-description">Game not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="window-frame">
      <div className="page-title-bar">
        SuDONKu - <span>{gameData.name}</span>
      </div>
      <div className="window-body">
        <div className="game-header">
          <div className="game-info-bar">
            <div className="info-item">
              <span className="info-label">Difficulty</span>
              <span className={`difficulty-badge ${gameData.difficulty === 'easy' ? 'easy' : 'hard'}`}>
                {gameData.difficulty === 'easy' ? 'Easy 6×6' : 'Normal 9×9'}
              </span>
            </div>
            <Timer timerSeconds={timerSeconds} />
            <div className="info-item">
              <span className="info-label">Creator</span>
              <span>{gameData.creator}</span>
            </div>
          </div>
        </div>

        <Board
          board={board}
          initial={initial}
          size={size}
          selectedCell={selectedCell}
          errors={errors}
          hintCell={hintCell}
          isComplete={isComplete}
          isLoggedIn={!!username}
          onSelectCell={handleSelectCell}
          onSetCell={handleSetCell}
          onClearCell={handleClearCell}
        />

        <CongratsMessage isComplete={isComplete} timerSeconds={timerSeconds} />

        <GameControls
          isComplete={isComplete}
          isLoggedIn={!!username}
          isCreator={username === gameData.creator}
          noHints={noHints}
          onReset={handleReset}
          onHint={handleHint}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

// Local isValid check for hint system (avoids importing from backend)
function isValidPlacement(board, row, col, num, size) {
  for (let c = 0; c < size; c++) {
    if (board[row][c] === num) return false;
  }
  for (let r = 0; r < size; r++) {
    if (board[r][col] === num) return false;
  }
  const subR = size === 6 ? 2 : 3;
  const subC = 3;
  const startRow = Math.floor(row / subR) * subR;
  const startCol = Math.floor(col / subC) * subC;
  for (let r = startRow; r < startRow + subR; r++) {
    for (let c = startCol; c < startCol + subC; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

export default Game;