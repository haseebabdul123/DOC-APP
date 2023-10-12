const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
} = require("../controllers/userCtrl");
const authMiddle = require("../middleware/authMiddle");

const router = express.Router();

router.post("/Login", loginController);
router.post("/Register", registerController);
router.post("/getUserData", authMiddle, authController);
router.post("/apply-doctor", authMiddle, applyDoctorController);

module.exports = router;
