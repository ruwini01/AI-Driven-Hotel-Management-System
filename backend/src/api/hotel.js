const express = require("express");
const {
  getAllHotels,
  createHotel,
  getHotelById,
  updateHotel,
  patchHotel,
  deleteHotel,
} = require("../application/hotel.js");
const isAuthenticated = require("./middleware/authentication-middleware.js");

const hotelRoute = express.Router();

const preMiddleware = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

hotelRoute
  .route("/")
  .get(getAllHotels)
  .post(createHotel);

hotelRoute
  .route("/:_id")
  .get(isAuthenticated, getHotelById)
  .put(updateHotel)
  .patch(patchHotel)
  .delete(deleteHotel);


module.exports = hotelRoute;