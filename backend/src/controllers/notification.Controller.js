import { Notification } from "../models/notification.Model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.Model.js";
import { io } from "../socket/socket.js";
import mongoose from "mongoose";

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
    const io = req.app.get("io");
    if (io) {
      io.to(receiver.toString()).emit("notification:new", notification);
    }

    return res
      .status(201)
      .json(new ApiResponse(201, notification, "Notification created successfully"));
});

export {
    createNotification
}