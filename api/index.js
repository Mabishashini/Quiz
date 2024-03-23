// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));

// Import controllers
const { createQuiz, addQuestion, getQuizByGamePin } = require('./controllers/createQuiz');
const { saveScore } = require('./controllers/scoreController');

// Define routes
app.post('/quiz', createQuiz); // Route for creating a new quiz
app.post('/quiz/:gamePin/questions', addQuestion); // Route for adding a question to an existing quiz
app.get('/quiz/:gamePin', getQuizByGamePin);
app.post('/score/submit', saveScore);

app.listen(8000, () => {
  console.log('API Working');
});
