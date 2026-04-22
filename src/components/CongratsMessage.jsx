function CongratsMessage({ isComplete, timerSeconds }) {
  if (!isComplete) return null;

  const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const secs = String(timerSeconds % 60).padStart(2, '0');

  return (
    <div className="congrats-banner">
      <div className="congrats-inner">
        <h2>Congratulations!</h2>
        <p>You solved the puzzle in {mins}:{secs}!</p>
      </div>
    </div>
  );
}

export default CongratsMessage;