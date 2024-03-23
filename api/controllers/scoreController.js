// controllers/scoreController.js
const Score = require('../models/Score');

const saveScore = async (req, res) => {
    const { gamePin, username, score } = req.body;

    try {
        // Check if there is an existing score document for the game pin
        let scoreDoc = await Score.findOne({ gamePin });

        if (!scoreDoc) {
            // If no score document exists for the game pin, create a new one
            scoreDoc = new Score({
                gamePin,
                username,
                score
            });
        } else {
            // If a score document exists, update the score for the user
            scoreDoc.username = username;
            scoreDoc.score = score;
        }

        // Save the score document
        await scoreDoc.save();

        res.status(201).json({ message: 'Score saved successfully' });
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ error: 'Failed to save score' });
    }
};

module.exports = { saveScore };
