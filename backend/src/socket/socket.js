// src/socket/socket.js
import { Server } from "socket.io";

let io;
const onlineUsers = new Map();

export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

    socket.on("register", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log("🟢 User online:", userId);
    });

    socket.on("disconnect", () => {
      for (const [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) onlineUsers.delete(userId);
      }
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });
};

export { io, onlineUsers };
