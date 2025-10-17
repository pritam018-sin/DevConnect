import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Recursive replies (each reply is also a comment)
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true }
);

// ✅ Ensure unique likes per user per comment
commentSchema.index({ _id: 1, "likes": 1 }, { unique: true, sparse: true });

// Auto populate for nested replies (if needed)
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "username fullname avatar",
  });
  next();
});

export const Comment = mongoose.model("Comment", commentSchema);
