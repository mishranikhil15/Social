const mongoose = require("mongoose");

// {
//     _id: ObjectId,
//     user: { type: ObjectId, ref: 'User' },
//     text: String,
//     image: String,
//     createdAt: Date,
//     likes: [{ type: ObjectId, ref: 'User' }],
//     comments: [{
//       user: { type: ObjectId, ref: 'User' },
//       text: String,
//       createdAt: Date
//     }]
//   }

const PostSchema = mongoose.Schema({
  user: { type: "ObjectId", ref: "User" },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: "ObjectId", ref: "User" }],
  comments: [
    {
      user: { type: "ObjectId", ref: "User" },
      text: String,
      createdAt: Date,
    },
  ],
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = {
  PostModel,
};
