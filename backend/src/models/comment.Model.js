import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "parentType", // dynamic reference
    },
    parentType: {
      type: String,
      required: true,
      enum: ["Post", "Project"], // can expand in future
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

commentSchema.index({ _id: 1, likes: 1 }, { unique: true, sparse: true });

// Auto populate for nested replies (if needed)
commentSchema.pre(/^find/, function (next) {
  this.populate({ path: "author", select: "username fullname avatar" });
  next();
});

export const Comment = mongoose.model("Comment", commentSchema);
