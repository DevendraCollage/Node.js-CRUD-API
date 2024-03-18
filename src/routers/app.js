//TODO: REST-API (Representational State Transfer - Application Programming Interface)

//TODO: Import the required modules
const express = require("express");
require("../../src/db/conn"); //? This will require the connection file of the db
const gymModel = require("../../src/models/model"); //? Import the Models of the Gym Schema

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

//! Handle Get Method - This for test to check the connection properly set or not
app.get("/", async (req, res) => {
  res.send("Hello From The Server!");
});

//! Handle Post Method - This method through user can enter the data or pass the data to the database using postman or using the url and consume the API in React or Angular app.
app.post("/gym", async (req, res) => {
  try {
    const newChallenge = await gymModel.create(req.body);
    res.status(201).json(newChallenge); // 201 status code for resource created
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Handle Get Method - We need to read the data (GetbyAll)
app.get("/gym", async (req, res) => {
  await gymModel.find().then((data) => {
    res.json(data);
  });
});

//! Handle Get Method - We need to read the data (GetByID)
app.get("/gym/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findTravelersByID = await gymModel.findOne({ ChallengeID: id }); // This will find the object by my id not with an object id

    // if user not found
    if (!findTravelersByID) {
      return res.json({ message: "Fitness Challenge not found" });
    }
    // if find then give the response
    res.send(findTravelersByID);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Handle Patch Method - We need to update the data (UpdateByID)
app.patch("/gym/:id", async (req, res) => {
  const result = await gymModel.findOneAndUpdate(
    { ChallengeID: req.params.id },
    req.body
  );
  res.send(result);
});

//! Handle Delete Method - We need to delete the data (DeleteByID)
app.delete("/gym/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findFitnessChallengesById = await gymModel.findOneAndDelete({
      ChallengeID: id,
    });
    if (!findFitnessChallengesById) {
      return res.json({ message: "Fitness Challenge not found" });
    }
    res.send(findFitnessChallengesById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//* Listen The Port and Start the server
app.listen(port, () => {
  console.log("Server Started on 3001 Port.");
});
