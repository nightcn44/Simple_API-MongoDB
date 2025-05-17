const User = require("../models/user");
const hashPassword = require("../utils/hashPassword");
const validatePassword = require("../utils/validatePassword");
const { generateToken } = require("../utils/jwtUtils");

exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.find({}).exec();

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const getuser = await User.findById(userId);

    if (!getuser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(getuser);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const updateData = {};

    if (req.body.username) updateData.username = req.body.username;
    if (req.body.email) updateData.email = req.body.email;

    if (req.body.password && req.body.password.trim() !== "") {
      updateData.password = await hashPassword(req.body.password);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(400).json("Internal server error");
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json("Internal server error");
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email is already in use" });
    }

    const hashedPassword = await hashPassword(password);

    const newdata = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newdata.save();

    res.status(201).json({ message: "Register success" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const data = await User.findOne({ username });

    if (!data) {
      return res.status(400).json({ error: "Username not found" });
    }

    const isMatch = await validatePassword(password, data.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = generateToken(data);

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};
