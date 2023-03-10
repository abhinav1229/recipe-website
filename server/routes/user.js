const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const UserModel = require("../Db/user");
const ProfileModel = require("../Db/profile");

router.post("/register", async (req, res) => {
  const fullName = req.body.fullName;
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  const user = new UserModel({
    fullName: fullName,
    userName: userName,
    userEmail: userEmail,
    userPassword: userPassword,
    userOtp: "",
  });

  const profile = new ProfileModel({
    userName: userName,
    fullName: fullName,
    userBio: "",
    userSocialLinks: ["", "", ""],
  });

  try {
    let userSaveResult = await user.save();
    await profile.save();
    res.send(userSaveResult._id);
  } catch (e) {
    console.log("Error from database save...");
  }
});

router.post("/registerValidate", async (req, res) => {
  let userName = req.body.userName;
  let userEmail = req.body.userEmail;

  UserModel.find({ userName: userName }, (err, result) => {
    if (result.length === 0) {
      UserModel.find({ userEmail: userEmail }, (err, result) => {
        if (result.length === 0) {
          res.send("OK");
        } else {
          res.send("email");
        }
      });
    } else {
      res.send("username");
    }
  });
});

router.post("/loginValidate", async (req, res) => {
  let userName = req.body.userName;
  let userPassword = req.body.userPassword;

  UserModel.find(
    { userName: userName, userPassword: userPassword },
    (err, result) => {
      if (result.length !== 0) {
        res.status(200).send(result);
      } else {
        res.send("invalid");
      }
    }
  );
});

router.post("/userInfo", async (req, res) => {
  let userName = req.body.userName;
  UserModel.find({ userName: userName }, (err, result) => {
    if (err) res.send("ERROR");
    else res.send(result);
  });
});

router.post("/userInfoById", async (req, res) => {
  let userId = req.body.userId;
  console.log(userId);
  UserModel.find({ _id: userId }, (err, result) => {
    if (err) res.send("ERROR");
    else res.send(result);
  });
});

router.get("/", (req, res) => {
  res.send("Inside user router");
});

module.exports = router;
