function Rules() {
  return (
    <div className="window-frame">
      <div className="page-title-bar">SuDONKu - <span>Rules</span></div>
      <div className="window-body">

        <div className="window-panel rules-card">
          <h2>Objective</h2>
          <p>Fill every cell in the grid so that each row, column, and sub-grid contains every number exactly once.</p>
        </div>

        <div className="window-panel rules-card">
          <h2>The Grid</h2>
          <p>SuDONKu offers two board sizes:</p>
          <ul className="rules-list">
            <li><span className="rule-highlight">Easy (6×6)</span> — Six 3×2 sub-grids. Numbers 1 to 6.</li>
            <li><span className="rule-highlight">Normal (9×9)</span> — Nine 3×3 sub-grids. Numbers 1 to 9.</li>
          </ul>
        </div>

        <div className="window-panel rules-card">
          <h2>Rules</h2>
          <ol className="rules-list">
            <li>Pre-filled cells are <span className="rule-highlight">given</span> and cannot be changed.</li>
            <li>Each <span className="rule-highlight">row</span> must contain every number exactly once.</li>
            <li>Each <span className="rule-highlight">column</span> must contain every number exactly once.</li>
            <li>Each <span className="rule-highlight">sub-grid</span> must contain every number exactly once.</li>
            <li>There is only one valid solution per puzzle.</li>
          </ol>
        </div>

        <div className="window-panel rules-card">
          <h3>Tips for Beginners</h3>
          <p>Scan for rows and columns missing just one number. Work through sub-grids that are almost full. Eliminate impossible values cell by cell.</p>
        </div>

        <h2 className="credits-heading">Credits</h2>
        <div className="window-panel credits-card">
          <p>SuDONKu was designed and built as a course project.</p>
          <div className="credits-links">
            <a href="mailto:jay.yang0705@gmail.com" className="credit-link">jay.yang0705@gmail.com</a>
            <a href="https://github.com/" className="credit-link">github.com/</a>
            <a href="https://linkedin.com/in/" className="credit-link">linkedin.com/in/</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Rules;