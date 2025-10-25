import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Project } from "../models/project.Model.js";
import { User } from "../models/user.Model.js";
import mongoose from "mongoose";
import { Comment } from "../models/comment.Model.js";
import { cloudinaryUpload } from "../utils/cloudnaryService.js";

const createProject = asyncHandler(async (req, res) => {
  const { title, description, techStack, githubLink, liveLink, thumbnail } =
    req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }
  const thumbnailLocalPath = req.file?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required");
  }
  const thumbnailCloud = await cloudinaryUpload(thumbnailLocalPath);

  if (!thumbnailCloud) {
    throw new ApiError(500, "Thumbnail upload failed");
  }
  const project = await Project.create({
    author: req.user._id,
    title,
    description,
    techStack,
    githubLink,
    liveLink,
    thumbnail: thumbnailCloud.url || "",
  });
  if (!project) {
    throw new ApiError(500, "Project creation failed");
  }
  res
    .status(201)
    .json(new ApiResponse(201, "Project created successfully", project));
});

const getAllProjects = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, techStack } = req.query;

  // Convert to integers
  page = parseInt(page);
  limit = parseInt(limit);

  const filter = {};
  console.log("Tech Stack Filter:", techStack);

  if (techStack) {
    filter.techStack = { $regex: techStack, $options: "i" };
  }

  const projects = await Project.find(filter)
    .populate("author", "fullname username avatar") // ✅ correct field name is author
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Project.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(200, { projects, total }, "Projects fetched successfully")
  );
});

const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new ApiError(400, "Invalid project ID");
    }

    const project = await Project.findById(projectId)
        .populate("author", "fullname username avatar")
        .populate("comments")
        .exec();

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    res.status(200).json(new ApiResponse(200, project, "Project fetched successfully"));
});

export {
    createProject,
    getAllProjects,
    getProjectById
};
