const Review = require("../infrastructure/entities/Review");
const Hotel = require("../infrastructure/entities/Hotel");

const createReview = async (req, res) => {
  try {
    const reviewData = req.body;
    if (!reviewData.rating || !reviewData.comment || !reviewData.hotelId) {
      res.status(400).send();
      return;
    }

    const hotel = await Hotel.findById(reviewData.hotelId);
    if (!hotel) {
      res.status(404).send();
      return;
    }

    const review = await Review.create({
      rating: reviewData.rating,
      comment: reviewData.comment,
    });

    hotel.reviews.push(review._id);
    await hotel.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
};

const getReviewsForHotel = async (req, res) => {
    try {
      const hotelId = req.params.hotelId;
      const hotel = await Hotel.findById(hotelId).populate("reviews");
      if (!hotel) {
        res.status(404).send();
        return;
      }
  
      res.status(200).json(hotel.reviews);
    } catch (error) {
      res.status(500).send();
    }
  };


module.exports = { createReview, getReviewsForHotel };