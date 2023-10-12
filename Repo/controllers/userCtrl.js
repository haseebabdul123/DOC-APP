const userModel = require("../models/userModel");
const doctorModel = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const registerUser = await userModel.findOne({ email: req.body.email });
    if (registerUser) {
      return res
        .status(200)
        .send({ message: "User Already Registered", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    newUser.save();
    res.status(201).send({ message: "Registered Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: `Register Cotroller ${error.message}` });
  }
};

const loginController = async (req, res) => {
  try {
    const User = await userModel.findOne({ email: req.body.email });
    if (!User) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, User.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Email or Password is invalid", success: false });
    }
    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .send({ message: "Login Sucessfully", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in login Ctrl ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.UserId });
    user.password == undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Auth Error ${error.message}` });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "Pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has apply for Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res
      .status(201)
      .send({ message: "Applied for Doctor Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while applying for doctor",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
};
