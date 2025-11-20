import { Notification } from "../models/notification.Model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { io, onlineUsers } from "../socket/socket.js";

// Create Notification
const createNotification = asyncHandler(async (req, res) => {
  const { receiver, type, message, link } = req.body;
  const sender = req.user?._id;

  if (!receiver || !type || !message) {
    throw new ApiError(400, "receiver, type and message are required");
  }

  const notification = await Notification.create({
    sender,
    receiver,
    type,
    message,
    link
  });

  // Emit notification event
  const receiverSocketId = onlineUsers.get(receiver.toString());
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("notification:new", notification);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, notification, "Notification created successfully"));
});

// Get User Notifications
const getUserNotifications = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const notifications = await Notification.find({ receiver: req.user._id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("sender", "username avatar fullName");

  const totalNotifications = await Notification.countDocuments({ receiver: req.user._id });
  const unreadCount = await Notification.countDocuments({ receiver: req.user._id, read: false });

  return res.status(200).json(
    new ApiResponse(200, {
      notifications,
      totalPages: Math.ceil(totalNotifications / limit),
      currentPage: page,
      unreadCount
    }, "Notifications fetched successfully")
  );
});

// Mark Notification as Read
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findByIdAndUpdate(
    id,
    { read: true },
    { new: true }
  );

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  return res.status(200).json(new ApiResponse(200, notification, "Notification marked as read"));
});

// Delete Notification
const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findByIdAndDelete(id);

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Notification deleted successfully"));
});

export {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification
};