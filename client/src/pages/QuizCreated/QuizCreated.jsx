import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./QuizCreated.css";

const QuizCreated = () => {
  const location = useLocation();
  const gamePin = new URLSearchParams(location.search).get("gamePin");
  const [copied, setCopied] = useState(false);

  const handleCopyPin = () => {
    navigator.clipboard.writeText(gamePin);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500); // Reset copied state after 1.5 seconds
  };

  return (
    <div className="quiz-created">
      <Navbar />
      <div className="quiz-created-container">
        <div className="quiz-created-innerContainer">
          <h2 className="quiz-created-heading">
            Quiz Created <span>Successfully!!!</span>
          </h2>
          <p className="quiz-created-gamepin">
            Game PIN: {gamePin}{" "}
            
          </p>
          <p className="copy">{copied && <span className="copied-text">Copied ✓</span>}</p>
          <p className="copy-button" onClick={handleCopyPin}>
            Copy PIN
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizCreated;
