import { useState } from "react";
import { useGameContext } from "../../Context/GameContext";
import "./Board.css";

const Board = () => {
  const { saveUserScore, updateScores, addResult, resetScores } =
    useGameContext();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isCircleTurn, setIsCircleTurn] = useState(false);
  const [winningMessage, setWinningMessage] = useState(null);
  const [gameScores, setGameScores] = useState({
    player: 0,
    player2: 0,
    tie: 0,
  });

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isCircleTurn ? "O" : "X";
    setBoard(newBoard);

    if (calculateWinner(newBoard)) {
      const winner = isCircleTurn ? "player 2" : "player";
      updateScores(winner);
      addResult({ winner });
      setWinningMessage(winner);
      setGameScores((prevScores) => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1,
      }));
    } else if (newBoard.every((square) => square)) {
      updateScores("tie");
      addResult({ winner: "tie" });
      setWinningMessage("tie");
      setGameScores((prevScores) => ({
        ...prevScores,
        tie: prevScores.tie + 1,
      }));
    }

    setIsCircleTurn(!isCircleTurn);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const restartBoard = () => {
    setBoard(Array(9).fill(null));
    setWinningMessage(null);
    setIsCircleTurn(false);
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setWinningMessage(null);
    setIsCircleTurn(false);
    resetScores();
  };

  const addToGamesPlayed = () => {
    saveUserScore(gameScores.player, gameScores.player2, gameScores.tie);
  };

  return (
    <div className="board">
      {board.map((square, index) => (
        <div
          key={index}
          className={`cell ${square}`}
          onClick={() => handleClick(index)}
        >
          {square}
        </div>
      ))}
      {winningMessage && (
        <div className={`winning-message ${winningMessage && "show"}`}>
          <div data-winning-message-text>
            {winningMessage === "player"
              ? "You win!"
              : winningMessage === "player 2"
              ? "Player 2 wins!"
              : "It's a tie!"}
          </div>
          <div className="buttons-div">
            <button className="buttons-div btn" onClick={restartBoard}>
              Continue
            </button>
            <button className="buttons-div btn" onClick={resetBoard}>
              Reset
            </button>
            <button className="buttons-div btn" onClick={addToGamesPlayed}>
              Save Score
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
