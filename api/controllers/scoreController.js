// controllers/scoreController.js
const Score = require('../models/Score');

const saveScore = async (req, res) => {
    const { gamePin, username, score } = req.body;

    try {
        // Check if the username already exists for the given gamePin
        const existingScore = await Score.findOne({ gamePin, username });

        if (existingScore) {
            // If the username exists, update the score
            existingScore.score = score;
            await existingScore.save();
            res.status(200).json({ message: 'Score updated successfully' });
        } else {
            // If the username doesn't exist, create a new score document
            const newScore = new Score({
                gamePin,
                username,
                score
            });
            await newScore.save();
            res.status(201).json({ message: 'Score saved successfully' });
        }
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ error: 'Failed to save score' });
    }
};



const checkUsername = async (req, res) => {
    const { gamePin, username } = req.query;

    try {
        // Select all scores from the database with the given gamePin
        const selectedData = await Score.find({ gamePin });

        // Check if there exists any user with the same username within the selected scores
        const exists = selectedData.some(score => score.username === username);

        if (!exists) {
            // If the score document does not exist, create a new one with an initial score of 0
            const newScore = new Score({
                gamePin,
                username,
                score: 0
            });
            await newScore.save();
        }

        // Return the result to the client
        res.status(200).json({ exists });
    } catch (error) {
        console.error('Error checking username:', error);
        res.status(500).json({ error: 'Failed to check username' });
    }
};
const getLeaderboard = async (req, res) => {
    const { gamePin } = req.params;

    try {
        // Fetch leaderboard data for the specified gamePin, sorted primarily by score in descending order,
        // and secondarily by the time they finished the quiz in ascending order
        const leaderboard = await Score.find({ gamePin })
            .sort({ score: -1, createdAt: 1 }) // createdAt assumes there's a createdAt field for the time they finished the quiz
             // Limiting to top 10 scores
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
};

const getRankByUsername = async (req, res) => {
    const { gamePin, username } = req.query;
  

    try {
        // Fetch leaderboard data for the specified gamePin, sorted primarily by score in descending order,
        // and secondarily by the time they finished the quiz in ascending order
        const leaderboard = await Score.find({ gamePin })
            .sort({ score: -1, createdAt: 1 }); // createdAt assumes there's a createdAt field for the time they finished the quiz
        
        // Find the index of the user within the sorted array
        const userIndex = leaderboard.findIndex(entry => entry.username === username);
        
        // Calculate the rank by adding 1 to the index (assuming ranks start from 1)
        const rank = userIndex !== -1 ? userIndex + 1 : null;

        res.status(200).json({ rank });
    } catch (error) {
        console.error('Error finding user rank:', error);
        res.status(500).json({ error: 'Failed to find user rank' });
    }
};



module.exports = { saveScore, checkUsername, getLeaderboard, getRankByUsername };
