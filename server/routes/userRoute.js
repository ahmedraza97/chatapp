const express = require("express");
const router = express.Router();
const {
  registerUser,
  deleteUser,
  getUsers,
  updateUser,
  loginUser,
} = require("../controllers/userController");

router.post("/get-user", getUsers);

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);




router.post("/delete-user", deleteUser);
router.post("/update-user", updateUser);

module.exports = router;
