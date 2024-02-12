import { useGameContext } from "../../Context/GameContext";
import "./Results.css";

const Results = () => {
  const { gameResults } = useGameContext();

  return (
    <div>
      <h2>Results</h2>
      <ul className="result-list">
        {gameResults && gameResults.length > 0 ? (
          gameResults.map((result, index) => (
            <li key={index}>{`Winner: ${result.winner}`}</li>
          ))
        ) : (
          <li>No results yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Results;
