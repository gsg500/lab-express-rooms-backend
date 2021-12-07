const userModel = require("../models/userModel");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const generateToken = require("../config/jwtConfig");
const theAuthenticated = require("../middlewares/theAuthenticated");
const salt_Rooms = 10;

router.post("/signup", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
      )
    ) {
      return res.status(400).json({
        msg: "A senha deve conter pelo menos 8 caracteres, letras maiúscula e minúsculas, números e caracteres especiais",
      });
    }

    const salt = bcrypt.genSaltSync(salt_Rooms);
    const passwordHash = bcrypt.hashSync(password, salt);
    const result = await userModel.create({ name, email, passwordHash });

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;
    const foundUser = await userModel.findOne({ email });
    console.log(`found user ${foundUser}`)

    if (!foundUser) {
      return res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }

    if (!bcrypt.compareSync(password, foundUser.passwordHash)) {
      return res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }

    const token = generateToken(foundUser);
    res.status(200).json(token);
  } catch (err) {
    console.log(err);
  }
});

router.get("/profile", theAuthenticated, async (req, res) => {
  try {

    const user = await userModel.findOne({ _id: req.user._id }).populate({
      path: "rooms",
      model: "rooms",
    });

     .populate({
      path: "reviews",
      model: "reviews",
    });

    res.status(200).json(user);

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;