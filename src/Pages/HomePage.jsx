import Board from "../Components/Board/Board";
import Scores from "../Components/Scores/Scores";
import Results from "../Components/Results/Results";
import Leaderboard from "../Components/Leaderboard/Leaderboard";
const HomePage = () => {
  return (
    <div>
      <Board />
      <Scores />
      <Results />
      <Leaderboard />
    </div>
  );
};

export default HomePage;
