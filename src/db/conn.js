//TODO: Import the required modules
const mongoose = require("mongoose");

//! Define the connection your app with MongoDB Database.
mongoose
  .connect(
    "mongodb://localhost:27017/FitnessChallenges"
    //? If not pass this object this will give the depreciation error
    //? {useNewUrlParse: true, useUnifiedTopology: true}
  )
  .then(() => {
    //? This will return promise if connection is successful or not.
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Not Connected Successful!", error);
  });
