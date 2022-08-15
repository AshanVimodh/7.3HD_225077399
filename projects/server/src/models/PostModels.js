const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// PostSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
