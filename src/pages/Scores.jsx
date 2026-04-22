import { useState, useEffect } from 'react';
import axios from 'axios';

function Scores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/highscore')
      .then(res => {
        setScores(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load highscores:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="window-frame">
      <div className="page-title-bar">SuDONKu - <span>High Scores</span></div>
      <div className="window-body">
        <p className="page-subtitle">Top SuDONKu players ranked by games won.</p>

        {loading ? (
          <p className="page-description">Loading scores...</p>
        ) : scores.length === 0 ? (
          <p className="page-description">No scores yet. Be the first to win a game!</p>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Wins</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s, i) => (
                <tr key={s.username} className={i < 3 ? `rank-${['gold', 'silver', 'bronze'][i]}` : ''}>
                  <td><span className="rank-badge">{i + 1}</span></td>
                  <td>{s.username}</td>
                  <td>{s.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Scores;