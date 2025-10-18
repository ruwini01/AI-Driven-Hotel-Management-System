const Location = require("../infrastructure/entities/Location.js");

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).send();
  }
};

const createLocation = async (req, res) => {
  try {
    const locationData = req.body;
    if (!locationData.name) {
      res.status(400).send();
      return;
    }
    await Location.create(locationData);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
};

const getLocationById = async (req, res) => {
  try {
    const _id = req.params._id;
    const location = await Location.findById(_id);
    if (!location) {
      res.status(404).send();
      return;
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).send();
  }
};

const updateLocation = async (req, res) => {
  try {
    const _id = req.params._id;
    const locationData = req.body;
    if (!locationData.name) {
      res.status(400).send();
      return;
    }

    const location = await Location.findById(_id);
    if (!location) {
      res.status(404).send();
      return;
    }

    await Location.findByIdAndUpdate(_id, locationData);
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
};

const patchLocation = async (req, res) => {
  try {
    const _id = req.params._id;
    const locationData = req.body;
    if (!locationData.name) {
      res.status(400).send();
      return;
    }
    const location = await Location.findById(_id);
    if (!location) {
      res.status(404).send();
      return;
    }
    await Location.findByIdAndUpdate(_id, { name: locationData.name });
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
};

const deleteLocation = async (req, res) => {
  try {
    const _id = req.params._id;
    const location = await Location.findById(_id);
    if (!location) {
      res.status(404).send();
      return;
    }
    await Location.findByIdAndDelete(_id);
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
}; 


module.exports = { getAllLocations, createLocation, getLocationById, updateLocation, patchLocation, deleteLocation };