import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="window-frame">
      <div className="page-title-bar">SuDONKu - <span>Home</span></div>
      <div className="window-body">
        <div className="hero-section">
          <h1>Welcome to <span className="highlight">SuDONKu</span></h1>
          <p className="hero-subtitle">
            A retro take on the classic number puzzle. Challenge your mind,
            track your scores, and compete with friends.
          </p>
          <div className="hero-buttons">
            <Link to="/games" className="btn">Start Playing</Link>
            <Link to="/rules" className="btn">Learn the Rules</Link>
          </div>
        </div>

        <div className="home-features">
          <h2 className="section-heading">Why SuDONKu?</h2>
          <div className="features-grid">
            <div className="window-panel feature-card">
              <h3>&#128338; Timed Challenges</h3>
              <p>Race against the clock and push your solving speed to new limits.</p>
            </div>
            <div className="window-panel feature-card">
              <h3>&#127942; Leaderboards</h3>
              <p>Compete with other players and climb the global high score rankings.</p>
            </div>
            <div className="window-panel feature-card">
              <h3>&#9881; Two Modes</h3>
              <p>Ease in with a 6x6 grid or go all-out on the classic 9x9 challenge.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="art-section">
        <div className="window-panel art-panel">
          <img src="/assets/sudoku-cat.webp" alt="Cat helping solve sudoku" />
        </div>
        <p className="art-caption">Sudoku improves memory, logical thinking, and concentration.</p>
      </div>

    </div>
  );
}

export default Home;