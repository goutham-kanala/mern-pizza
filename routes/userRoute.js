const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();
    res.send('User Registered successfully');
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const currentUser = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      res.send(currentUser);
    } else {
      return res.status(400).json({ message: 'User Login Failed' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;

  try {
    await User.findOneAndDelete({ _id: userid });
    res.send('User Deleted Successfully');
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
