import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
     author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // connects post to user
      required: true,
    },

    content: {
      type: String,
      trim: true,
    },

    image: {
      type: String, // Cloudinary URL ya local path
    },

    likeCount: {
      type: Number,
      default: 0,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
)

export const Post = mongoose.model("Post", postSchema);