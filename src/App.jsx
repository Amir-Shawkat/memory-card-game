
import { Card } from "./componenets/Card";
import { GameHeader } from "./componenets/GameHeader"
import { WinMessage } from "./componenets/WinMessage";
import { useGameLogic } from "./componenets/hooks/useGameLogic";

const easyCardValues = [
  "🍌","🍎","🍋‍🟩","🍇","🍉","🥝","🍆","🍒","🍌","🍎","🍋‍🟩","🍇","🍉","🥝","🍆","🍒"
];

function App() {

  const {cards, moves, isGameComplete, initializeGame, handleCardClick} = useGameLogic(easyCardValues)

  return (
    <div className="app">
      
      <GameHeader moves={moves} onReset={initializeGame} />

      {isGameComplete && <WinMessage moves={moves}/>}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>

    </div>
  )
}

export default App
