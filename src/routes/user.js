const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");

const router = express.Router();

router.post("/profile/register", async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
});

router.post(
  "/profile/login",
  passport.authenticate("local"),
  async (req, res) => {
    try {
      const user = req.user;

      return res.send(user);
    } catch (error) {
      return res.send(error);
    }
  }
);

router.get("/profile", async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      return res.send({ Error: "User not found" });
    }

    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
});

router.put("/profile", async (req, res) => {
  const { email, ...rest } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { ...rest },
      { new: true }
    );

    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
});

router.delete("/profile", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.send({ Error: "User not found" });
    }

    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
