
export const WinMessage = ({moves, bestScore, isNewRecord }) => {
    return (
        <div className="win-message">
            <h2>Congratulations!</h2>
            {isNewRecord ? (
            <p>🏆 New Best score! You finished in {moves} moves.</p>
            ) : (
            <p>
                You finished in {moves} moves. Best score: {bestScore}
            </p>
            )}

        </div>
    )
}