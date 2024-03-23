// QuizCreated.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import  "./QuizCreated.css"

const QuizCreated = () => {
  const location = useLocation();
  const gamePin = new URLSearchParams(location.search).get('gamePin');

  return (
    <div className='quiz-created'>
      <Navbar/>
      <div className="quiz-created-container">
        <div className="quiz-created-innerContainer">
      
      <h2 className='quiz-created-heading'>Quiz Created <span>Successfully!!!</span></h2>
      <p className='quiz-created-gamepin'>Game PIN: {gamePin}</p>
        </div>
      </div>
    </div>
  );
};

export default QuizCreated;
