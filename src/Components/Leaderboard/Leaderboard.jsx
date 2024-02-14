import { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [userScores, setUserScores] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/scores/user-scores", {
        withCredentials: true,
      })
      .then((response) => {
        setUserScores(response.data.userScores);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="leaderboard-container">
        {userScores.map((userScore, index) => (
          <div key={index} className="user-score-card">
            <p className="user-nickname">{userScore.nickname}</p>
            <p className="user-score">Score: {userScore.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
