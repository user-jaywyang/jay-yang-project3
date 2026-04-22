import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register(username, password);
      navigate('/games');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  const isDisabled = !username || !password || !confirm;

  return (
    <div className="window-frame form-frame">
      <div className="page-title-bar">SuDONKu - <span>Register</span></div>
      <div className="window-body">
        <h3 className="form-heading">Join SuDONKu</h3>
        <p className="form-subheading">Sign up to track your scores and compete on the leaderboard.</p>

        {error && <p className="form-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="reg-username">Username</label>
          <input
            type="text"
            id="reg-username"
            placeholder="Choose a username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-password">Password</label>
          <input
            type="password"
            id="reg-password"
            placeholder="Create a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-confirm">Confirm Password</label>
          <input
            type="password"
            id="reg-confirm"
            placeholder="Re-enter your password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <button
          className="btn form-submit"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          Create Account
        </button>

        <p className="form-footer">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;