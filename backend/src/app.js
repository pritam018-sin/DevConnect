import express from 'express';
import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: '30kb'}));
app.use(express.urlencoded({extended: true, limit: '30kb'}));
app.use(express.static("public"));// Serve static files from the 'public' directory
app.use(cookieParser());

import userRoutes from "./routes/user.Routes.js"
import postRoutes from "./routes/post.Routes.js"
import commentRoutes from "./routes/comment.Routes.js"
import projectRoutes from "./routes/project.Routes.js"
import likeRoutes from "./routes/like.Routes.js"

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/likes", likeRoutes);

export default app;
