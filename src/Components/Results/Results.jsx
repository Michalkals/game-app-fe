import { useGameContext } from "../../Context/GameContext";
import "./Results.css";

const Results = () => {
  const { gameResults } = useGameContext();

  return (
    <div>
      <h2>Results</h2>
      <ul className="result-list">
        {gameResults.map((result, index) => (
          <li key={index}>{`Winner: ${result.winner}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
