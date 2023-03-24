import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      // password: req.body.password, // replaced wit hashed password
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json({ msg: "Signup successfull" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }); // find username
    if (!user) {
      res.status(400).json("Wrong credentials");
    } else {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (!validate) {
        res.status(400).json("Wrong credentials");
      } else {
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
