function Cell({
  row, col, value, isGiven, isSelected, isError, isHint,
  size, isComplete, isLoggedIn, onSelectCell, onSetCell, onClearCell
}) {
  const handleClick = () => {
    if (isComplete || !isLoggedIn) return;
    onSelectCell(row, col);
  };

  const handleChange = (e) => {
    const input = e.target.value;
    if (input === '' || input === '0') {
      onClearCell(row, col);
      return;
    }
    const num = parseInt(input, 10);
    if (num >= 1 && num <= size) {
      onSetCell(row, col, num);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      onClearCell(row, col);
    }
  };

  let className = 'cell';
  if (isGiven) className += ' cell-given';
  if (isSelected) className += ' cell-selected';
  if (isError) className += ' cell-error';
  if (isHint) className += ' cell-hint';
  if (isComplete) className += ' cell-locked';
  if (!isLoggedIn) className += ' cell-locked';

  return (
    <div className={className} onClick={handleClick}>
      {isGiven || (isComplete && value !== 0) ? (
        <span className="cell-value">{value}</span>
      ) : (
        <input
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value || ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          readOnly={isComplete || !isLoggedIn}
          className="cell-input"
        />
      )}
    </div>
  );
}

export default Cell;