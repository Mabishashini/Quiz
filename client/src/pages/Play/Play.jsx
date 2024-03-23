import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import "./Play.css";

const Play = () => {
  const [gamePin, setGamePin] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGamePinChange = (event) => {
    setGamePin(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if the username already exists for the given game pin
      const response = await axios.get(`http://localhost:8000/score/check?gamePin=${gamePin}&username=${username}`);
      if (response.data.exists) {
        setError("Username already exists for this quiz");
      } else {
        // If the username doesn't exist, navigate to QuizDetails with game pin and username
        await axios.get(`http://localhost:8000/quiz/${gamePin}`);
        navigate(`/quiz/${gamePin}?username=${username}`);
      }
    } catch (error) {
      setError("Quiz not found");
    }
  };

  return (
    <div className="play">
      <Navbar />
      <div className="play-container">
        <div className="play-inner-container">
          <h2 className="play-title">Play Quiz</h2>
          <form onSubmit={handleSubmit} className="play-form">
            <label htmlFor="gamePin">Enter Game PIN:</label>
            <input
              type="text"
              id="gamePin"
              value={gamePin}
              onChange={handleGamePinChange}
              required
              className="input"
            />
            <label htmlFor="username">Enter Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
              className="input"
            />
            <button className="play-btn home-btn" type="submit">Play</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Play;
