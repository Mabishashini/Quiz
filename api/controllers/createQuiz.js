// controllers/quizController.js
const Quiz = require('../models/Quiz');

// Generate a unique alphanumeric PIN
const generatePIN = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const pinLength = 6; // You can adjust the length of the PIN as needed
  let pin = '';

  for (let i = 0; i < pinLength; i++) {
    pin += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return pin;
};

// Controller to create a new quiz
const createQuiz = async (req, res) => {
  try {
    const gamePin = generatePIN();// Generate a unique alphanumeric PIN
    const { title, questions } = req.body; 
    const validatedQuestions = questions.map(question => ({
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswerIndex // Set correctAnswer to null if not provided
    }));

    const quiz = new Quiz({
      gamePin,
      title,
      questions: validatedQuestions
    });
    await quiz.save(); // Save the quiz to the database
    

    res.status(201).json({ gamePin });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

// Controller to add a question to an existing quiz
const addQuestion = async (req, res) => {
  const { gamePin } = req.params; // Extract gamePin from request parameters
  const { question, options, correctAnswer } = req.body; // Extract question details from request body

  try {
    const quiz = await Quiz.findOne({ gamePin });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Add the question to the quiz
    quiz.questions.push({ question, options, correctAnswer });
    await quiz.save();

    res.status(201).json({ message: 'Question added successfully' });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: 'Failed to add question' });
  }
};

const getQuizByGamePin = async (req, res) => {
  const { gamePin } = req.params;

  try {
    const quiz = await Quiz.findOne({ gamePin });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

module.exports = { createQuiz, addQuestion, getQuizByGamePin };
