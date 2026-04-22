# SuDONKu — Project 3

A fullstack Sudoku web app built with React, Express, MongoDB, and JWT authentication for CS5610. Play on two difficulty modes (Easy 6×6 and Normal 9×9), create and share games, compete on the leaderboard, and track high scores.

## Author
Jay Yang CS5610, 2026

## Live Demo

🔗 [Render Deployment](https://jay-yang-project3.onrender.com/)

## Features

### Core Gameplay
- **Two difficulty modes**: Easy (6×6 grid) and Normal (9×9 grid)
- **Puzzle generation**: Backtracking algorithm with unique solution verification runs server side
- **Real-time validation**: Cells that violate row, column, or subgrid rules are highlighted in red
- **Input enforcement**: Only valid numbers (1–6 or 1–9) are accepted
- **Timer**: Tracks elapsed time per game session
- **Hint system**: Highlights cells where only one valid number is possible 
- **Game completion**: Board locks and congratulations banner displays on successful solve
- **Auto-generated game names**: Three random words from a 1000 word list per game

### Authentication
- **Register**: Create account with username and password (passwords hashed with bcrypt)
- **Login**: JWT token stored in httpOnly cookie
- **Persistent sessions**: Cookie-based auth persists across page refreshes
- **Logged-out experience**: Users can view all pages and games but cannot interact or create games
- **Navbar**: Dynamically shows Login/Register when logged out, Username/Logout when logged in

### Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with game title, description, and cat photo |
| `/games` | Game selection; create new games + browse existing ones |
| `/game/:gameId` | Play a specific game loaded from the database |
| `/rules` | Rules of Sudoku with credits and contact links |
| `/scores` | Real high scores leaderboard from database |
| `/login` | Login form with disabled submit when fields are empty |
| `/register` | Register form with password confirmation and validation |

### Styling
- Windows 95 aesthetic with beveled borders, grey panels, and blue gradient title bars
- Dark mode toggle (purple background, neon green text, orange accents)
- Four cell states: Unselected, Selected (yellow), Incorrect (red border), Hover
- Fully responsive navbar, moves to bottom on mobile
- Consistent theming across all pages

## Tech Stack

- **Frontend**: React 19, React Router v7, Vite, Axios
- **Backend**: Express, Node.js
- **Database**: MongoDB Atlas, Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing, cookie-parser
- **Styling**: Custom CSS (no CSS libraries)

## RESTful APIs

### User APIs
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/user/isLoggedIn` | Check cookie, return username or null |
| POST | `/api/user/login` | Verify credentials, set JWT cookie |
| POST | `/api/user/register` | Create user, hash password, set JWT cookie |
| POST | `/api/user/logout` | Clear auth cookie |

### Sudoku APIs
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/sudoku` | Return list of all games |
| POST | `/api/sudoku` | Generate new game (easy or normal), return game ID |
| GET | `/api/sudoku/:gameId` | Return full game data for playing |
| PUT | `/api/sudoku/:gameId` | Update game state (board, completion) |
| DELETE | `/api/sudoku/:gameId` | Delete game and associated highscores |

### Highscore APIs
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/highscore` | Return sorted leaderboard (username + win count) |
| POST | `/api/highscore` | Record a win for a game |
| GET | `/api/highscore/:gameId` | Return highscore for specific game |

## MongoDB Collections

### users
Stores registered user accounts with hashed passwords.

### sudonku_games
Stores all Sudoku games including board state, solution, initial state, creator, difficulty, and completion status.

### sudonku_highscores
Stores individual game completions with username, game ID, and completion time.

## Project Structure

```
project3/
├── server.js                       Express server + MongoDB connection
├── package.json                    Dependencies and scripts
├── vite.config.js                  Vite config with /api proxy
├── index.html                      Vite entry
│
├── backend/
│   ├── apis/
│   │   ├── sudoku.api.js           Sudoku CRUD routes
│   │   ├── user.api.js             Auth routes (register/login/logout)
│   │   └── highscore.api.js        Highscore routes
│   ├── schema/
│   │   ├── sudoku.schema.js        Game document schema
│   │   ├── user.schema.js          User document schema
│   │   └── highscore.schema.js     Highscore document schema
│   ├── model/
│   │   ├── sudoku.model.js         Game CRUD functions
│   │   ├── user.model.js           User CRUD functions
│   │   └── highscore.model.js      Highscore CRUD functions
│   └── utils/
│       ├── generatePuzzle.js       Backtracking puzzle generator
│       ├── auth.js                 JWT middleware and helpers
│       └── words.js                1000+ word list for game names
│
├── src/
│   ├── main.jsx                    Vite entry point
│   ├── App.jsx                     Router + providers
│   ├── context/
│   │   ├── AuthContext.jsx          Login state via API
│   │   └── ThemeContext.jsx         Dark mode toggle
│   ├── components/
│   │   ├── Navbar.jsx              Auth-aware navigation
│   │   ├── Footer.jsx              Page footer
│   │   ├── Board.jsx               Sudoku grid renderer
│   │   ├── Cell.jsx                Individual cell with input
│   │   ├── Timer.jsx               MM:SS timer display
│   │   ├── GameControls.jsx        Reset, Hint, Delete buttons
│   │   └── CongratsMessage.jsx     Victory banner
│   ├── pages/
│   │   ├── Home.jsx                Home page
│   │   ├── Selection.jsx           Create games + browse list
│   │   ├── Game.jsx                Dynamic game page
│   │   ├── Rules.jsx               Rules + credits
│   │   ├── Scores.jsx              Live leaderboard
│   │   ├── Login.jsx               Login form
│   │   └── Register.jsx            Register form
│   ├── utils/
│   │   └── validation.js           Client-side error detection
│   └── css/
│       ├── common.css              Win95 theme + dark mode
│       └── board.css               Cell states, grid, controls
│
└── public/
    └── assets/
        └── sudoku-cat.webp         Home page cat image
```

## Bonus Features

### Password Encryption 
User passwords are hashed using bcrypt with 10 salt rounds before storage. Login uses `bcrypt.compare` to verify. See `backend/apis/user.api.js`.

### Delete Game 
When the game creator visits their game, a "Delete Game" button appears. Deleting a game also removes all associated highscores. See the DELETE route in `backend/apis/sudoku.api.js` and the delete button in `src/components/GameControls.jsx`.



## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm
- MongoDB Atlas account (free tier)

### Installation
```bash
git clone https://github.com/user-jaywyang/jay-yang-project3.git
cd jay-yang-project3
npm install
```

### Configuration
1. Create a MongoDB Atlas cluster and get your connection string
2. In `server.js`, replace the MongoDB URL placeholder with your connection string

### Running Locally
```bash
npm run dev
```

Opens Vite frontend at `http://localhost:5173` and Express backend on port 8000.

### Production Build
```bash
npm run build
npm run prod
```

Then visit `http://localhost:8000`.

## Deployment (Render)
Deployed as a **Web Service** on Render:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run prod`
- **Environment Variables**:
  - `MONGO` MongoDB Atlas connection string
  - `NODE_VERSION` your Node.js version
  - `SUPER_SECRET` JWT signing secret

## Code Sources
- Project template: [cs5610_project3_template](https://github.com/ajorgense1-chwy/cs5610_project3_template)
- MVC pattern reference: [cs5610_spr23_mod3](https://github.com/ajorgense1-chwy/cs5610_spr23_mod3)
- JWT auth pattern: Course lecture gists by Hunter Jorgensen
- Random word list: [www.randomlists.com/random-words](https://www.randomlists.com/random-words)

