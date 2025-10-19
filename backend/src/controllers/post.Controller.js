import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Post } from "../models/post.Model.js";
import {User} from "../models/user.Model.js";
import { cloudinaryUpload } from "../utils/cloudnaryService.js";

const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;

  // ✅ Validation
  if (!content?.trim() && !req.file) {
    throw new ApiError(400, "Post must have either content or an image");
  }

  // ✅ Image upload handling
  let imageUrl = "";
  const imageLocalPath = req.file?.path;

  if (imageLocalPath) {
    const uploadedImage = await cloudinaryUpload(imageLocalPath);
    if (!uploadedImage?.url) {
      throw new ApiError(500, "Image upload failed, please try again");
    }
    imageUrl = uploadedImage.url;
  }

  // ✅ Create post in DB
  const post = await Post.create({
    content: content?.trim() || "",
    image: imageUrl,
    author: req.user._id,
  });

  if (!post) {
    throw new ApiError(500, "Something went wrong while creating the post");
  }

  // ✅ Populate author details before sending response
  const populatedPost = await Post.findById(post._id)
    .populate("author", "fullname username avatar") // only required fields
    .lean();

  // ✅ Response
  return res
    .status(201)
    .json(new ApiResponse(201, populatedPost, "Post created successfully"));
});

const editPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const postId = req.params.postId;

  // ✅ Find existing post
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // ✅ Check authorization
  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to edit this post");
  }

  // ✅ Prepare new content
  if (!content?.trim() && !req.file) {
    throw new ApiError(400, "Post must have at least content or an image");
  }

  let updatedFields = {};

  // ✅ Update content if provided
  if (content?.trim()) {
    updatedFields.content = content.trim();
  }

  // ✅ Handle new image upload (if user changed the image)
  if (req.file?.path) {
    // Delete old image if it existed
    if (post.image) {
      await cloudinaryDelete(post.image);
    }

    const uploadedImage = await cloudinaryUpload(req.file.path);
    if (!uploadedImage?.url) {
      throw new ApiError(500, "Image upload failed, please try again");
    }
    updatedFields.image = uploadedImage.url;
  }

  // ✅ Update the post in DB
  const updatedPost = await Post.findByIdAndUpdate(postId, updatedFields, {
    new: true,
  }).populate("author", "fullname username avatar");

  // ✅ Response
  return res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

export { 
    createPost,
    editPost,
 };

