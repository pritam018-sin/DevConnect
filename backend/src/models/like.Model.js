import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    parentType: {
      type: String,
      enum: ["Post", "Project", "Comment"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Prevent duplicate likes (same user cannot like same post/project/comment twice)
likeSchema.index({ user: 1, parentId: 1, parentType: 1 }, { unique: true });

export const Like = mongoose.model("Like", likeSchema);
