import React, { useEffect, useState } from 'react'
import axios, { all } from "axios";

const Leaderboard = () => {

  const [allUsers, setAllUsers] = useState([])

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/all-users")
      setAllUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])


  return (
    <div>
      <h2>Top 5 Players</h2>
      {allUsers.map((user) => {
        return (
          <div>
            {user.firstName} - {user.gamesPlayed}
          </div>
        )
      })}
    </div>
  )
}

export default Leaderboard