import { Like } from "../models/like.Model.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.Model.js";
import { Project } from "../models/project.Model.js";
import { Comment } from "../models/comment.Model.js";

const getParentModel = (type) => {
  switch (type) {
    case "Post":
      return Post;
    case "Project":
      return Project;
    case "Comment":
      return Comment;
    default:
      throw new ApiError(400, "Invalid parent type");
  }
};

// ✅ Toggle Like/Unlike (works for Post, Project, Comment)
const toggleLike = asyncHandler(async (req, res) => {
  const { parentId, parentType } = req.body;
  const userId = req.user._id;

  if (!["Post", "Project", "Comment"].includes(parentType)) {
    throw new ApiError(400, "Invalid parent type");
  }

  const ParentModel = getParentModel(parentType);
  const parent = await ParentModel.findById(parentId);
  if (!parent) throw new ApiError(404, `${parentType} not found`);

  // Check if like already exists
  const existingLike = await Like.findOne({ user: userId, parentId, parentType });

  if (existingLike) {
    // Unlike
    await existingLike.deleteOne();
    await ParentModel.findByIdAndUpdate(parentId, { $pull: { likes: userId } });
    return res
      .status(200)
      .json(new ApiResponse(200, null, `${parentType} unliked successfully`));
  }

  // Like
  const newLike = await Like.create({ user: userId, parentId, parentType });
  await ParentModel.findByIdAndUpdate(parentId, { $addToSet: { likes: userId } });

  res
    .status(201)
    .json(new ApiResponse(201, newLike, `${parentType} liked successfully`));
});

// ✅ Get All Likes for a Parent
const getLikes = asyncHandler(async (req, res) => {
  const { parentId, parentType } = req.query;

  if (!["Post", "Project", "Comment"].includes(parentType)) {
    throw new ApiError(400, "Invalid parent type");
  }

  const likes = await Like.find({ parentId, parentType }).populate(
    "user",
    "fullname username avatar"
  );

  res
    .status(200)
    .json(new ApiResponse(200, likes, "Likes fetched successfully"));
});

export { 
    toggleLike,
    getLikes
};