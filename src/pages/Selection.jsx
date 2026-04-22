import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

function Selection() {
  const [games, setGames] = useState([]);
  const [loadingGames, setLoadingGames] = useState(true);
  const [creating, setCreating] = useState(false);
  const { username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await axios.get('/api/sudoku');
      setGames(res.data);
    } catch (err) {
      console.error('Failed to load games:', err);
    }
    setLoadingGames(false);
  };

  const handleCreate = async (difficulty) => {
    if (!username) return;
    setCreating(true);
    try {
      const res = await axios.post('/api/sudoku', { difficulty });
      navigate(`/game/${res.data.gameId}`);
    } catch (err) {
      console.error('Failed to create game:', err);
      setCreating(false);
    }
  };

  // Format date as "Mon Day, Year" (e.g., "Jan 1, 2026")
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div className="window-frame">
      <div className="page-title-bar">SuDONKu - <span>Select a Game</span></div>
      <div className="window-body">

        {/* Create buttons */}
        <div className="create-buttons">
          <button
            className="btn"
            onClick={() => handleCreate('normal')}
            disabled={!username || creating}
          >
            {creating ? 'Creating...' : 'Create Normal Game'}
          </button>
          <button
            className="btn"
            onClick={() => handleCreate('easy')}
            disabled={!username || creating}
          >
            {creating ? 'Creating...' : 'Create Easy Game'}
          </button>
        </div>

        {!username && (
          <p className="login-prompt">Log in to create and play games.</p>
        )}

        {/* Game list */}
        <h3 className="section-heading">Available Games</h3>

        {loadingGames ? (
          <p className="page-description">Loading games...</p>
        ) : games.length === 0 ? (
          <p className="page-description">No games yet. Create one above!</p>
        ) : (
          <div className="game-list">
            {games.map(g => (
              <Link
                key={g._id}
                to={`/game/${g._id}`}
                className="window-panel game-card"
              >
                <div className="game-info">
                  <h3 className="game-name">{g.name}</h3>
                  <p className="game-author">
                    By <span>{g.creator}</span> &middot; {formatDate(g.createdAt)}
                  </p>
                </div>
                <div className="game-meta">
                  <span className={`game-difficulty ${g.difficulty === 'easy' ? 'easy' : 'hard'}`}>
                    {g.difficulty === 'easy' ? 'Easy 6×6' : 'Normal 9×9'}
                  </span>
                  {g.completed && <span className="game-completed-badge">Completed</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Selection;