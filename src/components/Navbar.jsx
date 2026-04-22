// Conditional auth navbar pattern from: course lecture demo file
// (ahjorgen167/c1d662fa, header.component.js, LOGGEDIN/LOGGEDOUT state)
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

function Navbar() {
  const { username, loading, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const linkClass = ({ isActive }) => isActive ? 'nav-active' : '';

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <span>&#9638;</span> SuDONKu
      </NavLink>
      <ul className="nav-links">
        <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
        <li><NavLink to="/games" end className={linkClass}>Play</NavLink></li>
        <li><NavLink to="/rules" className={linkClass}>Rules</NavLink></li>
        <li><NavLink to="/scores" className={linkClass}>Scores</NavLink></li>

        {loading ? null : username ? (
          <>
            <li><span className="nav-username">{username}</span></li>
            <li><button className="nav-logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" className={linkClass}>Login</NavLink></li>
            <li><NavLink to="/register" className={linkClass}>Register</NavLink></li>
          </>
        )}
      </ul>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Dark Mode">
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}

export default Navbar;