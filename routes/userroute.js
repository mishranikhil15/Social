const express = require("express");
const { UserModel } = require("../models/usermodel");
const userrouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userrouter.post("/register", async (req, res) => {
  const { name, email, password, dob, bio, posts, friends, friendRequests } =
    req.body;

  try {
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log({ msg: "Error while hashing the password" });
      } else {
        let user_data = new UserModel({
          name,
          email,
          password: secure_password,
          dob,
          bio,
          posts,
          friends,
          friendRequests,
        });
        await user_data.save();
        res.status(201).json({ msg: "Successfully registered the User" });
      }
    });
  } catch (error) {
    console.log(error);
    res.json("Error While Registering the User");
  }
});

userrouter.get("/users", async (req, res) => {
  try {
    let find_user = await UserModel.find().populate("posts").populate("friends").populate("friendRequests").exec();
    res.status(200).json({ msg: find_user });
  } catch (error) {
    console.log(error);
    res.json("Error While Finding the User");
  }
});

userrouter.get("/users/:id/friends", async (req, res) => {
  let id = req.params.id;
  try {
    let find_user = await UserModel.find({ _id: id}).populate("posts").populate("friends").populate("friendRequests").exec();
    console.log(find_user);
    res.status(200).json({ msg: find_user[0].friends });
  } catch (error) {
    console.log(error);
    res.json("Error While Findingfriends of the User");
  }
});

userrouter.post("/users/:id/friends", async (req, res) => {
  let id = req.params.id;
  let friend_id = req.body.friendRequests;
  try {
    let user_data = await UserModel.find({ _id: id});
    console.log(user_data);
    if (user_data.length > 0) {
      user_data[0].friendRequests.push(friend_id);
      let resp = await user_data[0].save();
      res.json({ msg: resp });
    }
  } catch (error) {
    console.log(error);
    res.json("Error While sending the friendrequest");
  }
});


userrouter.patch("/users/:id/friends/:friendId", async (req, res) => {
    let id = req.params.id;
    let friend_id = req.params.friendId;
    try {
      let user_data = await UserModel.find({ _id: id});
    //   console.log(user_data);
      if (user_data.length > 0) {
        user_data[0].friendRequests.push(friend_id);
        let resp = await user_data[0].save();
        res.json({ msg:"friend request accepted","resp":resp });
      }else{
        res.json({ msg:"friend request rejected" });
      }
    } catch (error) {
      console.log(error);
      res.json("Error While accepting the friendrequest"); 
    }
  });

module.exports = {
  userrouter,
};


// {
//     "name":"manoj",
//     "email":"manoj@gmail.com",
//     "password":"manoj",
//     "dob":"1996-09-26",
//     "bio":"I am gunjan",
//     "friends":"6450b6dd9b65145f61075989",
//      "friendRequests":"6450b25d2613c3d3706ec653"
//   }