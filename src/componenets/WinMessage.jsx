
export const WinMessage = ({moves}) => {
    return (
        <div className="win-message">
            <h2>Congratulations!</h2>
            <p>You have completed the game in {moves} moves!</p>
        </div>
    )
}