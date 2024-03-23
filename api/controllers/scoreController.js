// controllers/scoreController.js
const Score = require('../models/Score');

const saveScore = async (req, res) => {
    const { gamePin, username, score } = req.body;

    try {
        // Create a new score document
        const newScore = new Score({
            gamePin,
            username,
            score
        });

        // Save the new score document
        await newScore.save();

        res.status(201).json({ message: 'Score saved successfully' });
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


module.exports = { saveScore, checkUsername };
