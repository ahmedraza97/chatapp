const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  try {
    const { name, email, number, password, city } = req.body;
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.json({ mes: "Email Already Exist", status: false });
    }
    const checkNum = await User.findOne({ number });
    if (checkNum) {
      return res.json({ mes: "Number Already Exist", status: false });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      number,
      city,
      password: hashPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ mes: "Incorrect Username or Password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ mes: "Incorrect Username or Password", status: false });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  const { _id } = req.body;
  try {
    const data = await User.find({ _id: { $ne: _id } }).select([
      "email",
      "_id",
      "name",
      "number",
      "city",
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("error");
  }
};

// extras

const deleteUser = async (req, res) => {
  const { _id } = req.body;
  try {
    const data = await User.findByIdAndRemove(_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("error");
  }
};

const updateUser = async (req, res) => {
  const { _id } = req.body;

  try {
    const data = await User.findByIdAndUpdate(_id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("error");
  }
};

module.exports = { registerUser, loginUser, deleteUser, getUsers, updateUser };
