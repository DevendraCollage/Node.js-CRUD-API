//TODO: Import the required modules
const mongoose = require("mongoose");

const gymSchema = mongoose.Schema({
  ChallengeID: {
    type: Number,
    required: true,
    unique: true,
  },
  ChallengeName: {
    type: String,
    required: true,
    trim: true,
  },
  StartDate: {
    type: String,
    required: true,
    trim: true,
  },
  EndDate: {
    type: String,
    required: true,
    trim: true,
  },
  Progress: {
    type: Number,
    required: true,
    trim: true,
  },
});

//? Create collection in the mongoDB Database
const collectionGymSchema = new mongoose.model("FitnessChallenges", gymSchema);

module.exports = collectionGymSchema;
