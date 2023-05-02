const mongoose = require("mongoose");

// {
//     _id: ObjectId,
//     name: String,
//     email: String,
//     password: String,
//     dob: Date,
//     bio: String,
//     posts: [{ type: ObjectId, ref: 'Post' }],
//     friends: [{ type: ObjectId, ref: 'User' }],
//     friendRequests: [{ type: ObjectId, ref: 'User' }]
//   }

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dob: Date,
  bio: String,
  posts: [{ type: "ObjectId", ref: "Post" }],
  friends: [{ type: "ObjectId", ref: "User" }],
  friendRequests: [{ type: "ObjectId", ref: "User" }],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserModel,
};
