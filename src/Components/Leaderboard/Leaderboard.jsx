import { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [userScores, setUserScores] = useState([]);
  const [currentUserScores, setCurrentUserScores] = useState([])


  const getUserScores=()=>{
    axios.get("http://localhost:8080/scores/user-scores", {
        withCredentials: true,
      })
      .then((response) => {
        const sortedScores = response.data.userScores.sort(
          (a, b) => b.score - a.score
        );
        const formattedScores = sortedScores.map((userScore) => {
          const date = new Date(userScore.date);
          const formattedDate = `${date.getDate()}-${date.toLocaleString(
            "default",
            { month: "short" }
          )}-${date.getFullYear()}`;
          return { ...userScore, date: formattedDate };
        });
        setCurrentUserScores(formattedScores);
      })
      .catch((error) => {
        console.error(error);
      });}


  const getAllUsersHighestScores=()=>{
    axios.get("http://localhost:8080/scores/allusers", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
        const sortedScores = response.data.scores.sort((a, b) => b.score - a.score);
        const topThreeScores = sortedScores.slice(0, 3);
        const formattedScores = topThreeScores.map((userScore) => {
          const date = new Date(userScore.date);
          const formattedDate = `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
          return { ...userScore, date: formattedDate };
        });
        setUserScores(formattedScores);
      })
      .catch((error) => {
        console.error(error);
      });}

  useEffect(() => {
getAllUsersHighestScores()
  }, []);

  return (
    <div className="main">
      <div className="leaderboard-container">
        <p>Top three Records</p>
        {userScores && userScores.map((userScore, index) => (
          <div key={index} className="user-score-card">
            <p className="user-nickname">{userScore.nickname}</p>
            <p className="user-score">Score: {userScore.score}</p>
            <p className="user-score">At: {userScore.date}</p>
          </div>
        ))}
      </div>
      <div className="leaderboard-container2">
        <button className="leaderBoardBtn" onClick={getUserScores}>My Record History</button>
        {currentUserScores && currentUserScores.map((userScore, index) => (
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
