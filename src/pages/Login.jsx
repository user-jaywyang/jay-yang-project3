import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    try {
      await login(username, password);
      navigate('/games');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const isDisabled = !username || !password;

  return (
    <div className="window-frame form-frame">
      <div className="page-title-bar">SuDONKu - <span>Log In</span></div>
      <div className="window-body">
        <h3 className="form-heading">Welcome back</h3>
        <p className="form-subheading">Enter your credentials to continue.</p>

        {error && <p className="form-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button
          className="btn form-submit"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          Log In
        </button>

        <p className="form-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;