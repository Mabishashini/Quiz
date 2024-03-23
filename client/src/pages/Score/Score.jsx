import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const ScorePage = () => {
  const location = useLocation();
  const score = new URLSearchParams(location.search).get('score');
  const totalQuestions = new URLSearchParams(location.search).get('totalQuestions');

  return (
    <div className='quiz-created'>
      <Navbar/>
      <div className="quiz-created-container">
        <div className="quiz-created-innerContainer">
          <h2 className='quiz-created-heading'>Quiz Completed <span>Successfully!!</span></h2>
          <p className='quiz-created-gamepin'>Score: {score} / {totalQuestions}</p>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;
