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
        const sortedScores = response.data.userScores.sort((a, b) => b.score - a.score);
        const formattedScores = sortedScores.map((userScore) => {
          const date = new Date(userScore.date);
          const formattedDate = `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
          return { ...userScore, date: formattedDate };
        });
        setUserScores(formattedScores);
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
            <p className="user-score">At: {userScore.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;