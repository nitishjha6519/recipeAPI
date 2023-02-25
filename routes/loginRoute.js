const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const addModel = require("../models/addrecipe");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let { email, password } = req.body;

    console.log(email);

    let userDb = await userModel.find({ email: email });

    // console.log(userDb);

    if (userDb.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: "user already registered",
      });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: "hashing error",
        });
      }

      let newUser = await userModel.create({ email, password: hash });
      //   console.log(newUser);
      return res.status(200).json({
        status: "success",
        message: "user successfully stored in db",
        email: newUser.email,
      });
    });
  } catch (err) {
    return res.status(200).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // console.log(email);

    let userDb = await userModel.find({ email: email });
    // console.log(userDb);
    if (userDb.length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "user not registered",
      });
    }

    bcrypt.compare(password, userDb[0].password, async (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: "hashing error",
        });
      }

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: userDb[0]._id,
        },
        "secret"
      );

      return res.status(200).json({
        status: "success",
        token: token,
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.post("/addrecipe", async (req, res) => {
  try {
    let data = req.body;

    let newRecipe = await addModel.create(data);

    return res.status(200).json({
      status: "success",
      message: "successfully added",
      title: newRecipe.title,
    });
  } catch (err) {
    return res.status(200).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.get("/recipe", async (req, res) => {
  try {
    let newRecipe = await addModel.find();

    return res.status(200).json({
      status: "success",
      message: "fetched data",
      recipe: newRecipe,
    });
  } catch (err) {
    return res.status(200).json({
      status: "failed",
      message: err.message,
    });
  }
});

module.exports = router;
