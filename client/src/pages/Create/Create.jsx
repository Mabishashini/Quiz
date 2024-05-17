import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Create.css'; // Import the CSS file
import Navbar from '../../components/Navbar/Navbar';
import Select from 'react-select'; // Import React Select

const Create = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', ''], correctAnswerIndex: null }]);
  const navigate = useNavigate();

  const addQuestion = () => {
    // Check if all fields in the last question are filled before adding a new question
    const lastQuestion = questions[questions.length - 1];
    const isLastQuestionFilled = lastQuestion.question.trim() !== '' &&
      lastQuestion.options.every(option => option.trim() !== '') &&
      lastQuestion.correctAnswerIndex !== null;

    if (isLastQuestionFilled) {
      setQuestions([...questions, { question: '', options: ['', '', ''], correctAnswerIndex: null }]);
    } else {
      alert('Please fill all fields for the current question before adding a new one.');
    }
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (title.trim() === '') {
      alert('Please enter a title for the quiz.');
      return;
    }

    let isValid = true;
    questions.forEach((question, index) => {
      if (question.question.trim() === '') {
        alert(`Please enter a question for Question ${index + 1}.`);
        isValid = false;
      }
      question.options.forEach((option, optionIndex) => {
        if (option.trim() === '') {
          alert(`Please enter an option for Question ${index + 1}, Option ${optionIndex + 1}.`);
          isValid = false;
        }
      });
      if (question.correctAnswerIndex === null) {
        alert(`Please select a correct answer for Question ${index + 1}.`);
        isValid = false;
      }
    });

    if (!isValid) return;

    try {
      // Ensure each question has a correct answer before sending the request
      const validatedQuestions = questions.map(question => {
        if (question.options.length === 0) {
          return { ...question, correctAnswerIndex: null };
        } else {
          return question;
        }
      });

      // Send a POST request to the backend to create the quiz
      const response = await axios.post('http://localhost:8000/quiz', {
        title,
        questions: validatedQuestions
      });

      const { gamePin } = response.data;
      navigate(`/quiz-created?gamePin=${gamePin}`);
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  // Custom styles for React Select
  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: 'black' // Set text color to black
    }),
  };

  return (
    <div>
      <Navbar />
      <div className="create-outerContainer">
        <div className="create-container">
          <h2 className='create-create-quiz'>Create Quiz</h2>
          <form onSubmit={handleSubmit}>
            <div className='create-title'>
              <label htmlFor="title" className='create-title-label'>Title:</label>
              <input type="text" id="create-title-input" value={title} onChange={(e) => setTitle(e.target.value)} required className="input" />
            </div>
            {questions.map((question, index) => (
              <div key={index} className='create-qn'>
                {questions.length > 1 && <div className="delete-icon" onClick={() => handleDeleteQuestion(index)}>&times;</div>}
                <label htmlFor={`question${index}`}>Question {index + 1}:</label>
                <input type="text" id={`question${index}`} value={question.question} onChange={(e) => handleQuestionChange(index, e)} required className="input" />
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label htmlFor={`option${index}${optionIndex + 1}`}>Option {optionIndex + 1}:</label>
                    <input type="text" id={`option${index}${optionIndex + 1}`} value={option} onChange={(e) => handleOptionChange(index, optionIndex, e)} required className="input" />
                  </div>
                ))}
                <label htmlFor={`correctAnswer${index}`}>Correct Answer:</label>
                <Select
                  id={`correctAnswer${index}`}
                  value={question.correctAnswerIndex !== null ? { value: question.correctAnswerIndex, label: `Option ${question.correctAnswerIndex + 1}` } : null}
                  onChange={(selectedOption) => setQuestions(questions.map((q, i) => i === index ? { ...q, correctAnswerIndex: selectedOption.value } : q))}
                  options={question.options.map((option, optionIndex) => ({ value: optionIndex, label: `Option ${optionIndex + 1}` }))}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={customStyles} // Apply custom styles
                />
              </div>
            ))}
            <div className="buttons">
              <button type="button" onClick={addQuestion} className="create-btn home-btn">Add Question</button>
              <button type="submit" className="create-btn home-btn">Create Quiz</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
