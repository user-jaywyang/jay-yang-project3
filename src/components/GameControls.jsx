function GameControls({
  isComplete, isLoggedIn, isCreator, noHints,
  onReset, onHint, onDelete
}) {
  return (
    <div className="game-controls-wrapper">
      <div className="game-controls">
        {isLoggedIn && !isComplete && (
          <>
            <button className="btn" onClick={onReset}>Reset</button>
            <button className="btn btn-hint" onClick={onHint}>Hint</button>
          </>
        )}
        {isLoggedIn && isCreator && (
          <button className="btn btn-delete" onClick={onDelete}>Delete Game</button>
        )}
      </div>
      {noHints && (
        <p className="no-hints-msg">No hints available — try solving manually!</p>
      )}
      {isLoggedIn && !isComplete && (
        <p className="hint-info">Hint highlights a cell where only one number is possible.</p>
      )}
      {!isLoggedIn && (
        <p className="login-prompt">Log in to play this game.</p>
      )}
    </div>
  );
}

export default GameControls;