/**
 * Sudoku Puzzle Generator using Backtracking
 */

function getSubgridDims(size) {
  if (size === 6) return { rows: 2, cols: 3 };
  if (size === 9) return { rows: 3, cols: 3 };
  return { rows: 3, cols: 3 };
}

export function isValid(board, row, col, num, size) {
  for (let c = 0; c < size; c++) {
    if (board[row][c] === num) return false;
  }
  for (let r = 0; r < size; r++) {
    if (board[r][col] === num) return false;
  }
  const { rows: subR, cols: subC } = getSubgridDims(size);
  const startRow = Math.floor(row / subR) * subR;
  const startCol = Math.floor(col / subC) * subC;
  for (let r = startRow; r < startRow + subR; r++) {
    for (let c = startCol; c < startCol + subC; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function fillBoard(board, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) {
        const nums = shuffle([...Array(size)].map((_, i) => i + 1));
        for (const num of nums) {
          if (isValid(board, r, c, num, size)) {
            board[r][c] = num;
            if (fillBoard(board, size)) return true;
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function countSolutions(board, size, limit = 2) {
  let count = 0;
  function solve() {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (board[r][c] === 0) {
          for (let num = 1; num <= size; num++) {
            if (isValid(board, r, c, num, size)) {
              board[r][c] = num;
              solve();
              board[r][c] = 0;
              if (count >= limit) return;
            }
          }
          return;
        }
      }
    }
    count++;
  }
  solve();
  return count;
}

function copyBoard(board) {
  return board.map(row => [...row]);
}

function removeClues(board, size, targetFilled) {
  const totalCells = size * size;
  let filled = totalCells;
  const positions = shuffle(
    [...Array(totalCells)].map((_, i) => [Math.floor(i / size), i % size])
  );
  for (const [r, c] of positions) {
    if (filled <= targetFilled) break;
    const backup = board[r][c];
    board[r][c] = 0;
    const testBoard = copyBoard(board);
    if (countSolutions(testBoard, size) !== 1) {
      board[r][c] = backup;
    } else {
      filled--;
    }
  }
  return board;
}

export function generatePuzzle(difficulty) {
  const size = difficulty === 'easy' ? 6 : 9;
  const targetFilled = difficulty === 'easy'
    ? Math.floor((size * size) / 2)
    : 28 + Math.floor(Math.random() * 3);

  const board = Array.from({ length: size }, () => Array(size).fill(0));
  fillBoard(board, size);
  const solution = copyBoard(board);
  removeClues(board, size, targetFilled);
  const initial = copyBoard(board);

  return { board, solution, initial, size };
}

export { getSubgridDims, copyBoard };