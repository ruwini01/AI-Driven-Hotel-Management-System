const express = require('express');
const hotelsRouter = express.Router();
const getAllHotels = require('../application/hotel').getAllHotels;
const getHotelById = require('../application/hotel').getHotelById;
const createHotel = require('../application/hotel').createHotel;
const updateHotel = require('../application/hotel').updateHotel;
const patchHotel = require('../application/hotel').patchHotel;
const deleteHotel = require('../application/hotel').deleteHotel;




hotelsRouter.route('/')
  .get(getAllHotels)
  .post(createHotel);


hotelsRouter.route('/:id')
  .get(getHotelById)
  .put(updateHotel)
  .patch(patchHotel)
  .delete(deleteHotel);


module.exports = hotelsRouter;
