const express = require("express");
const router = express.Router();
const ReviewModel = require("../models/reviewsModel");
const theAuthenticated = require("../middlewares/theAuthenticated");
const userModel = require("../models/userModel");

router.post("/reviews", theAuthenticated, async (req, res) => {
  try {

 const user = await userModel.findOne({ _id: req.user._id })
    .populate({
      path: "rooms",
      model: "Room",
    });

    user.rooms.map((currentRooms) => {
      if(currentRooms._id == req.body.roomId) {
        throw new Error("Erro ao criar review")
      }
    })

    console.log(req.body);
    const result = await ReviewModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;