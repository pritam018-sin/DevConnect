// src/routes/message.routes.js
import { Router } from "express";

import {
  getMessages,
  sendMessage,
  editMessage,
  deleteMessage,
  markMessagesAsRead,
} from "../controllers/message.Controller.js"; // ✅ fixed name consistency
import { verifyJWT } from "../middlewares/auth.Middlewares.js";

const router = Router();

// 🟢 Send message
router.route("/").post(verifyJWT, sendMessage);

// 🟩 Get all messages between logged user and receiver
router.get("/:receiverId", verifyJWT, getMessages);

// 🟨 Edit a message (only sender)
router.put("/:id", verifyJWT, editMessage);

// 🟥 Delete a message (only sender)
router.delete("/:id", verifyJWT, deleteMessage);

// 🟦 Mark messages as read (optional route)
router.patch("/read/:receiverId", verifyJWT, markMessagesAsRead);

export default router;
