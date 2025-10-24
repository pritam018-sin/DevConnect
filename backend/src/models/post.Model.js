import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
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
    isPinned: {
      type: Boolean,
      default: false,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    repostedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
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
);

export const Post = mongoose.model("Post", postSchema);
