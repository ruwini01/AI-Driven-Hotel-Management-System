const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;