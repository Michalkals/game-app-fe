import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [gameResults, setGameResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateScores = (result) => {
    if (result === "player") {
      setPlayerScore(playerScore + 1);
    } else if (result === "player 2") {
      setPlayerTwoScore(playerTwoScore + 1);
    } else {
      setTieScore(tieScore + 1);
    }
  };

  const addResult = (result) => {
    setGameResults([...gameResults, result]);
  };

  const resetScores = () => {
    setPlayerScore(0);
    setPlayerTwoScore(0);
    setTieScore(0);
    setGameResults([]);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/users/check-status",
          {
            withCredentials: true,
          }
        );
        setIsLoggedIn(response.data.ok);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/users/log-out", {
        withCredentials: true,
      });
      localStorage.removeItem('userId');
      localStorage.removeItem('nickname');
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  const contextValue = {
    playerScore,
    playerTwoScore,
    tieScore,
    gameResults,
    isLoggedIn,
    setIsLoggedIn,
    updateScores,
    addResult,
    resetScores,
    handleLogout,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

const useGameContext = () => {
  return useContext(GameContext);
};

export { GameContextProvider, useGameContext };
