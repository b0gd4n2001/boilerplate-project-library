const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://bogdan:${process.env.DB}@issuetracker.bhvvixg.mongodb.net/?retryWrites=true&w=majority&appName=IssueTracker`)
    .then(() => {
        console.log('mongoDB success :)')
    })
    .catch(() => {
        console.log('mongoDB fail :(')
    });

const BookSchema = new mongoose.Schema({
    comments: [String],
    title: { type: String, required: true },
    commentcount: { type: Number, default: 0 }
});
const BookModel = mongoose.model("BookModel", BookSchema);

module.exports = BookModel;