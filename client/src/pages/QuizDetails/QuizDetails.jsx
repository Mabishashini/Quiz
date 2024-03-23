// QuizDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import "./QuizDetails.css"
import Navbar from '../../components/Navbar/Navbar';

const QuizDetails = () => {
  const { gamePin } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/quiz/${gamePin}`);
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch quiz details');
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [gamePin]);

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newAnswers = { ...answers, [questionIndex]: optionIndex };
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    // Calculate score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });
    try {
      await axios.post('http://localhost:8000/score/submit', {
        username,
        gamePin,
        score
      });
      setScore(score);
      navigate(`/score?score=${score}`);
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  return (
    <div className='quiz'>
      <Navbar/>
      <div className="create-outerContainer">

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {quiz && (
        <div className="create-container">
          <div>

          <h2 className='create-create-quiz'>Let's Playyyy!!</h2>
          <p className='quiz-gamePin'>Game PIN: {quiz.gamePin}</p>
          <h2 className='quiz-title'>{quiz.title}</h2>
         
          <form>
            {quiz.questions.map((question, questionIndex) => (
              <div key={questionIndex} className='quiz-form create-qn'>
                <p className='quiz-qn'>{questionIndex + 1}. {question.question}</p> {/* Display question number */}
                <ul className='quiz-list'>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex} className='quiz-option'>
                      <input
                        type="radio"
                        id={`option_${questionIndex}_${optionIndex}`}
                        name={`question_${questionIndex}`}
                        value={optionIndex}
                        checked={answers[questionIndex] === optionIndex}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                        className='quiz-input'
                      />
                      <label htmlFor={`option_${questionIndex}_${optionIndex}`}>{option}</label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button type="button" onClick={handleSubmit} className='create-btn home-btn'>Submit</button>
          </form>
          {score !== null && (
            <div>
              <h3>Result:</h3>
              <p>Score: {score} / {quiz.questions.length}</p>
            </div>
          )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default QuizDetails;
