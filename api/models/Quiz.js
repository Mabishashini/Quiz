const mongoose = require("mongoose")

const QuizSchema = mongoose.Schema({
    gamePin :{
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String, 
        required: true
    },
    questions : [{
        question: {
            type: String,
            required: true
        },
        options: {
            type: [String],
            required: true
        },
        correctAnswer : {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Quiz", QuizSchema)