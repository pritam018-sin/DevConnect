import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true, // for tracking when the like happened
  }
);

// ✅ Prevent duplicate likes by same user on same post
likeSchema.index({ user: 1, post: 1 }, { unique: true });

export const Like = mongoose.model("Like", likeSchema);
