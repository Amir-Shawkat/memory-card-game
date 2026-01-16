import { useEffect, useState } from "react";


export const useGameLogic = (cardValues , difficulty) => {
    const [cards , setCards] = useState([]);
    const [flippedCards , setFlippedCards] = useState([]);
    const [matchedCards , setMatchedCards] = useState([]);
    const [moves , setMoves] = useState(0);
    const [isLocked , setIsLocked] = useState(false);
    const [bestScore, setBestScore] = useState(null);
    const [isNewRecord, setIsNewRecord] = useState(false);


    //Shuffle Algorithme
    const shuffleArray = (array) => {
    const shuffled = [...array];
    for(let i = shuffled.length - 1 ; i > 0 ; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i] , shuffled[j]] = [shuffled[j] , shuffled[i]];
    }
    return shuffled;
    }

    const initializeGame = () => {
    //Shuffle the Cards
    const shuffledCards = shuffleArray(cardValues);

    const finalCards = shuffledCards.map((value , index) => (
    {
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
    }
    ));

    setCards(finalCards);
    setIsLocked(false);
    setMoves(0);
    setFlippedCards([]);
    setMatchedCards([]);
    }

    useEffect(() => {
        const savedBest = localStorage.getItem(`bestScore-${difficulty}`);
        if(savedBest){
            setBestScore(Number(savedBest));
        } else {
            setBestScore(null);
        }

        initializeGame();
    } , [difficulty , cardValues]);

    const handleCardClick = (card) => {
    //Don't allow clicking if card is already flipped, matched
    if(card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2){
        return;
    }

    //Update card flipped state
    const newCards = cards.map((c) => {
        if(c.id === card.id) {
        return {...c , isFlipped: true}
        } else {
        return c;
        }
    });

    setCards(newCards);

    const newFlippedCards = [...flippedCards , card.id];
    setFlippedCards(newFlippedCards);

    //Check a matched if two cards are flipped
    if(flippedCards.length === 1){

        setIsLocked(true);
        const firstCard = cards[flippedCards[0]];
    

        if(firstCard.value === card.value){
        setTimeout(() => {
            setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
    
            
    
            setCards((prev) => 
            prev.map((c) => {
                if(c.id === card.id || c.id === firstCard.id) {
                return {...c , isMatched: true}
                } else {
                return c;
                }
            })
            );

            setFlippedCards([]);
            setIsLocked(false);
        }, 500);
        } else {
        //Flip back card 1 , card 2
        setTimeout(() => {
            const flippedBackCard = newCards.map((c) => {
            if(newFlippedCards.includes(c.id) || c.id === card.id){
                return {...c, isFlipped: false};
            } else {
                return c;
            }
            });

            setCards(flippedBackCard);

            setFlippedCards([]);
            setIsLocked(false);
        }, 500);

        
        }

        setMoves((prev) => prev + 1);
    }
    };

    const isGameComplete = matchedCards.length === cardValues.length;

    useEffect(() => {
        if(!isGameComplete) return;

        const storageKey = `bestScore-${difficulty}`;

        if(bestScore === null || moves < bestScore){
            localStorage.setItem(storageKey , moves);
            setBestScore(moves);
            setIsNewRecord(true);
        } else {
            setIsNewRecord(false);
        }
    }, [isGameComplete]);

    return {cards, moves, isGameComplete, bestScore, isNewRecord, initializeGame, handleCardClick};
    
}