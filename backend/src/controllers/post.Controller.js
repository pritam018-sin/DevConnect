import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Post } from "../models/post.Model.js";
import {User} from "../models/user.Model.js";
import { Comment} from "../models/comment.Model.js";
import { Follow} from "../models/follow.Model.js";
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

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.postId

  const post = await Post.findById(postId);
  if(!post){
    throw new ApiError(404, "Post not found");
  }

  // ✅ Check authorization
  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this post");
  }

  // ✅ Delete post from DB
  await Post.findByIdAndDelete(postId);

  // ✅ Response
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Post deleted successfully"));
});

const getPostById = asyncHandler(async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findById(postId)
    .populate("author", "fullname username avatar")
    .populate("comments.author", "fullname avatar");
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // ✅ Response
  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"));
});

const getUserFeed = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const followingDocs = await Follow.find({ follower: userId }).select("following");
  const followingIds = followingDocs.map(f => f.following);

  followingIds.push(userId);

  const feedPosts = await Post.aggregate([
    {
      $match: {
        author: { $in: followingIds },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $project: {
        _id: 1,
        content: 1,
        image: 1,
        createdAt: 1,
        "author._id": 1,
        "author.fullname": 1,
        "author.username": 1,
        "author.avatar": 1,
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);

  if(!feedPosts.length){
    throw new ApiError(404, "No posts found in your feed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, feedPosts, "User feed fetched successfully"));
});

const getPostsByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });
  if (!user) throw new ApiError(404, "User not found");

  const posts = await Post.find({ author: user._id })
    .populate("author", "fullname username avatar")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts by user fetched successfully"));
});

const getUserAllPosts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const posts = await Post.find({ author: userId })
    .populate("author", "fullname username avatar")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "All user posts fetched successfully"));
});

const togglePinnedPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findOne({ _id: postId, author: req.user._id })
  .populate("author", "fullname username avatar");
  if (!post) throw new ApiError(404, "Post not found or unauthorized");

  post.isPinned = !post.isPinned;
  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, `Post ${post.isPinned ? "pinned" : "unpinned"} successfully`));
});
 
const repost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  // ✅ Find original post
  const originalPost = await Post.findById(postId)
    .populate("author", "fullname username avatar");

  if (!originalPost) {
    throw new ApiError(404, "Original post not found");
  }

  // ✅ Prevent self-repost
  if (originalPost.author._id.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot repost your own post");
  }

  // ✅ Prevent duplicate repost (same user reposting same post again)
  const alreadyReposted = await Post.findOne({
    author: req.user._id,
    repostedFrom: originalPost._id,
  });
  if (alreadyReposted) {
    throw new ApiError(400, "You already reposted this post");
  }

  // ✅ Create repost
  const repost = await Post.create({
    author: req.user._id,
    repostedFrom: originalPost._id,
  });

  // ✅ Populate full data (both repost author & original author)
  const populatedRepost = await Post.findById(repost._id)
    .populate("author", "fullname username avatar")
    .populate({
      path: "repostedFrom",
      populate: { path: "author", select: "fullname username avatar" },
    });

  return res
    .status(201)
    .json(new ApiResponse(201, populatedRepost, "Post reposted successfully"));
});

//abhi analytics baaki hai



export {
  createPost,
  editPost,
  deletePost,
  getPostById,
  getUserFeed,
  getPostsByUsername,
  getUserAllPosts,
  togglePinnedPost,
  repost,
};