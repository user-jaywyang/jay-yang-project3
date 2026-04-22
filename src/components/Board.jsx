import Cell from './Cell.jsx';
import '../css/board.css';

function Board({
  board, initial, size, selectedCell, errors, hintCell,
  isComplete, isLoggedIn, onSelectCell, onSetCell, onClearCell
}) {
  if (!board || board.length === 0) {
    return <div className="board-empty">No game loaded.</div>;
  }

  const boardClass = size === 6 ? 'sudoku-board board-6x6' : 'sudoku-board board-9x9';

  return (
    <div className="board-wrapper">
      <div className={boardClass}>
        {board.map((row, r) =>
          row.map((val, c) => {
            const isGiven = initial[r][c] !== 0;
            const isSelected = selectedCell && selectedCell.row === r && selectedCell.col === c;
            const isError = errors.has(`${r}-${c}`);
            const isHint = hintCell && hintCell.row === r && hintCell.col === c;

            return (
              <Cell
                key={`${r}-${c}`}
                row={r}
                col={c}
                value={val}
                isGiven={isGiven}
                isSelected={isSelected}
                isError={isError}
                isHint={isHint}
                size={size}
                isComplete={isComplete}
                isLoggedIn={isLoggedIn}
                onSelectCell={onSelectCell}
                onSetCell={onSetCell}
                onClearCell={onClearCell}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Board;