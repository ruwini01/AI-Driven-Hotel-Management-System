const express = require("express");
const { createReview, getReviewsForHotel } = require("../application/review");


const reviewRoute = express.Router();

reviewRoute.post("/", createReview);
reviewRoute.get("/hotel/:hotelId", getReviewsForHotel);

module.exports = reviewRoute;