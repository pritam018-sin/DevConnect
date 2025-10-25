import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    githubLink: {
      type: String,
      trim: true,
    },
    liveLink: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String, // Cloudinary URL or local path
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// ✅ Ensure unique likes per user
projectSchema.index({ _id: 1, "likes": 1 }, { unique: true, sparse: true });

export const Project = mongoose.model("Project", projectSchema);
