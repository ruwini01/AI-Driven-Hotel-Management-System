const express = require("express");
const {getAllLocations, createLocation, getLocationById, updateLocation, patchLocation, deleteLocation} = require("../application/location.js");

const locationsRoute = express.Router();
const isAuthenticated = require("./middleware/authentication-middleware.js");

locationsRoute
  .route("/")
  .get(getAllLocations)
  .post(isAuthenticated, createLocation);

locationsRoute
  .route("/:_id")
  .get(getLocationById)
  .put(updateLocation)
  .patch(patchLocation)
  .delete(deleteLocation);

module.exports = locationsRoute; 