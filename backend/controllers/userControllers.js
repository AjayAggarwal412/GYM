const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, gymName } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error(`User ${name} already exists`);
  }

  const user = await User.create({ name, email, password, phone, gymName });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gymName: user.gymName,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured.");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // console.log(email, password);
  // console.log(req.body);

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gymName: user.gymName,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password.");
  }
});

module.exports = { registerUser, authUser };
