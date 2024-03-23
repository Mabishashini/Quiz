// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const corsOptions = {
  origin: 'https://quiz-omcd.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Enable CORS for the specified URL
app.use(cors(corsOptions));
app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));

// Import controllers
const { createQuiz, addQuestion, getQuizByGamePin } = require('./controllers/createQuiz');
const { saveScore,checkUsername} = require('./controllers/scoreController');

// Define routes
app.post('/quiz', createQuiz); // Route for creating a new quiz
app.post('/quiz/:gamePin/questions', addQuestion); // Route for adding a question to an existing quiz
app.get('/quiz/:gamePin', getQuizByGamePin);
app.post('/score/submit', saveScore);
app.get("/score/check", checkUsername)


app.listen(8000, () => {
  console.log('API Working');
});
