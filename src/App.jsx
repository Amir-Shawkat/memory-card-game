
import { useState, useMemo } from "react";
import { Card } from "./componenets/Card";
import { GameHeader } from "./componenets/GameHeader"
import { WinMessage } from "./componenets/WinMessage";
import { useGameLogic } from "./componenets/hooks/useGameLogic";


const emojiPool = [
  "🍎","🍌","🍇","🍓","🍉","🥝","🍍","🍒","🍑","🍋",
  "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯",
  "🦁","🐮","🐸","🐵","🐔","🐧","🐦","🐤","🦆","🤣",
  "🚗","✈️","🚀","🚜","🏍️","🚁","🚕","💩","😘","💃",
  "⚽","🏀","🏈","🎾","🏓","🎯","🎮","🎲","🧩","👀",
  "😍","😏","😴","🤑","😵‍💫","😡","🤓","👻","🎃","💔",
];

const generateRandomCards = (pairCount) => {
  const shuffled = [...emojiPool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, pairCount);
  return [...selected, ...selected]; // create pairs
};


function App() {

  const [difficulty , setDifficulty] = useState("easy");
  const [seed , setSeed] = useState(0);

  const selectedCards = useMemo(() => {
  return difficulty === "easy"
    ? generateRandomCards(8)
    : generateRandomCards(18);
}, [difficulty, seed]);

  console.log(selectedCards)

  const {cards, moves, isGameComplete, bestScore, isNewRecord, initializeGame, handleCardClick} = useGameLogic(selectedCards , difficulty);

  const handleReset = () => {
  const isGameRunning = moves > 0 && !isGameComplete;

  if (isGameRunning) {
    const confirmReset = window.confirm(
      "Are you sure you want to restart the current game?"
    );
    if (!confirmReset) return;
  }
  setSeed(prev => prev + 1)
  initializeGame();
};


  return (
    <div className="app">
      
      <GameHeader moves={moves} difficulty={difficulty} setDifficulty={setDifficulty} onReset={handleReset} />

      {isGameComplete && <WinMessage moves={moves} bestScore={bestScore} isNewRecord={isNewRecord} />}

      <div className={`cards-grid ${difficulty}`}>
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>

    </div>
  )
}

export default App
