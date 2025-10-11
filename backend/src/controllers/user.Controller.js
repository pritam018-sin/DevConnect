import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.Model.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { cloudinaryUpload } from "../utils/cloudnaryService.js";

const createUser = asyncHandler(async (req, res) => {
  const {
    fullname,
    username,
    email,
    password,
    bio,
    skills,
    github,
    linkedin,
    portfolio,
  } = req.body;

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
 console.log("Creating user with email:", email, "and username:", username);
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new ApiError(409, "User already exists with this email or username");
  }
   
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await cloudinaryUpload(avatarLocalPath);
  const coverImage = await cloudinaryUpload(coverImageLocalPath);


  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }

  const user = await User.create({
    fullname,
    username,
    email,
    password,
    bio,
    skills,
    github,
    linkedin,
    portfolio,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  res.status(201).json(
    new ApiResponse(201, "User created successfully", createdUser)
  );
});

export {
  createUser
}