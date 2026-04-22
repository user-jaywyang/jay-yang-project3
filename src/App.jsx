import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Selection from './pages/Selection.jsx';
import Game from './pages/Game.jsx';
import Rules from './pages/Rules.jsx';
import Scores from './pages/Scores.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import './css/common.css';
import './css/board.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Selection />} />
            <Route path="/game/:gameId" element={<Game />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;