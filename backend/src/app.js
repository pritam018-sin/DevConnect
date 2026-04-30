import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { setupSocket } from './socket/socket.js';

const app = express(); // <-- pehle express app banao

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: '30kb' }));
app.use(express.urlencoded({ extended: true, limit: '30kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Debug Middleware: Log every request
app.use((req, res, next) => {
  console.log(`\n[REQUEST] ${req.method} ${req.url}`);
  console.log("[BODY]", JSON.stringify(req.body, null, 2));
  next();
});

// Routes import
import userRoutes from './routes/user.Routes.js';
import postRoutes from './routes/post.Routes.js';
import commentRoutes from './routes/comment.Routes.js';
import projectRoutes from './routes/project.Routes.js';
import likeRoutes from './routes/like.Routes.js';
import followRoutes from './routes/follow.Routes.js';
import notificationRoutes from './routes/notification.Routes.js';
import messageRoutes from './routes/message.Routes.js';

// Routes use
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/likes', likeRoutes);
app.use('/api/v1/follows', followRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/messages', messageRoutes);

// HTTP + Socket.io setup
const server = http.createServer(app);
setupSocket(server);

// Error Handling Middleware
import { errorHandler } from './middlewares/error.Middleware.js';
app.use(errorHandler);

export default server;
