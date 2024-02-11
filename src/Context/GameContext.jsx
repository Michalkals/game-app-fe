import { createContext, useState, useContext } from "react";

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [gameResults, setGameResults] = useState([]);

  const updateScores = (result) => {
    if (result === "player") {
      setPlayerScore(playerScore + 1);
    } else if (result === "computer") {
      setComputerScore(computerScore + 1);
    } else {
      setTieScore(tieScore + 1);
    }
  };

  const addResult = (result) => {
    setGameResults([...gameResults, result]);
  };

  const resetScores = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setTieScore(0);
    setGameResults(null)
  };

  const contextValue = {
    playerScore,
    computerScore,
    tieScore,
    gameResults,
    updateScores,
    addResult,
    resetScores,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

const useGameContext = () => {
  return useContext(GameContext);
};

export { GameContextProvider, useGameContext };
