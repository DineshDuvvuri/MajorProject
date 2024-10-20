
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true, // Ensure the comment is required
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true, // Ensure the rating is also required
    },
    createdAt: {
        type: Date,
        default: Date.now, // Use the function without parentheses
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Make sure to reference your User model here
        required: true, // Make sure author is required
    },
});

// Export the Review model
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
