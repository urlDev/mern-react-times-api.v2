const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");

const router = express.Router();

router.post("/profile/register", async (req, res) => {
  try {
    const user = new User(req.body);

    console.log(req.user);

    await user.save();
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/profile/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send({ Error: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.send({ Error: "Could not login" });
    }

    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
});

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
