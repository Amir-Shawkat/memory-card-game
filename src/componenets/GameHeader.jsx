
export const GameHeader = ({moves, difficulty, setDifficulty, onReset}) => {
    return (
    <div className="game-header">
        <h1>🧐Memory Card Game</h1>
        <div className="stats">
            <div className="stat-item">
                <span className="stat-label">Moves:</span>{" "}
                <span className="stat-value">{moves}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Difficulty</span>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="easy">Easy</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
        </div>
        <button className="reset-btn" onClick={onReset}>New Game</button>
    </div>
    )
}