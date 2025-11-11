import { Message } from "../models/message.Model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import { User } from "../models/user.Model.js";


// 🟩 Send new message
export const sendMessage = asyncHandler(async (req, res) => {
    const { receiverId, content } = req.body;
    const senderId = req.user._id;

    if (!receiverId || !content) {
     throw new ApiError(400, "Post must have either content or receiverId");
    }
    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });
    if (!newMessage) {
      throw new ApiError(500, "Something went wrong while sending the message");
    }
    return res
      .status(201)
      .json(new ApiResponse(201, newMessage, "Message sent successfully"));
}) 


// 🟦 Fetch all messages between logged user and receiver
export const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟧 Mark all messages as read (optional)
export const markMessagesAsRead = async (req, res) => {
  try {
    const { senderId } = req.params;
    const receiverId = req.user._id;

    await Message.updateMany(
      { sender: senderId, receiver: receiverId, read: false },
      { $set: { read: true } }
    );

    res.json({ message: "Messages marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟨 Edit message (only sender can)
export const editMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    if (message.sender.toString() !== userId.toString())
      return res.status(403).json({ message: "Not authorized" });

    message.content = content;
    await message.save();

    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟥 Delete message (only sender can)
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    if (message.sender.toString() !== userId.toString())
      return res.status(403).json({ message: "Not authorized" });

    await message.deleteOne();
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
