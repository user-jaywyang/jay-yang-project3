// Auth state pattern from: course lecture demo file (Hunter Jorgenson)
// (ahjorgen167, Missing Session Redirect / loggedin.component.js)
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login status on mount
  useEffect(() => {
    axios.get('/api/user/isLoggedIn')
      .then(res => {
        setUsername(res.data.username || null);
        setLoading(false);
      })
      .catch(() => {
        setUsername(null);
        setLoading(false);
      });
  }, []);

  const login = async (user, pass) => {
    const res = await axios.post('/api/user/login', {
      username: user,
      password: pass,
    });
    setUsername(res.data.username);
    return res.data;
  };

  const register = async (user, pass) => {
    const res = await axios.post('/api/user/register', {
      username: user,
      password: pass,
    });
    setUsername(res.data.username);
    return res.data;
  };

  const logout = async () => {
    await axios.post('/api/user/logout');
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}