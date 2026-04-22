function getSubgridDims(size) {
  if (size === 6) return { rows: 2, cols: 3 };
  if (size === 9) return { rows: 3, cols: 3 };
  return { rows: 3, cols: 3 };
}

export function findErrors(board, size) {
  const errors = new Set();

  for (let r = 0; r < size; r++) {
    const seen = {};
    for (let c = 0; c < size; c++) {
      const val = board[r][c];
      if (val === 0) continue;
      if (seen[val] !== undefined) {
        errors.add(`${r}-${c}`);
        errors.add(`${r}-${seen[val]}`);
      } else {
        seen[val] = c;
      }
    }
  }

  for (let c = 0; c < size; c++) {
    const seen = {};
    for (let r = 0; r < size; r++) {
      const val = board[r][c];
      if (val === 0) continue;
      if (seen[val] !== undefined) {
        errors.add(`${r}-${c}`);
        errors.add(`${seen[val]}-${c}`);
      } else {
        seen[val] = r;
      }
    }
  }

  const { rows: subR, cols: subC } = getSubgridDims(size);
  for (let gr = 0; gr < size; gr += subR) {
    for (let gc = 0; gc < size; gc += subC) {
      const seen = {};
      for (let r = gr; r < gr + subR; r++) {
        for (let c = gc; c < gc + subC; c++) {
          const val = board[r][c];
          if (val === 0) continue;
          if (seen[val]) {
            errors.add(`${r}-${c}`);
            errors.add(seen[val]);
          } else {
            seen[val] = `${r}-${c}`;
          }
        }
      }
    }
  }

  return errors;
}

export function isBoardComplete(board, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) return false;
    }
  }
  return findErrors(board, size).size === 0;
}