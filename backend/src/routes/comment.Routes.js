import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.Middlewares.js";
import { 
    createComment,
    deleteComment,
    getComments,
    replyToComment,
    toggleCommentLike,
 } from "../controllers/comment.Controller.js";

 const router = Router();

 router.route("/create-comment").post(verifyJWT, createComment);
 router.route("/:commentId/reply").post(verifyJWT, replyToComment);
 router.route("/post-comment").get(verifyJWT, getComments);
 router.route("/:commentId/like").post(verifyJWT, toggleCommentLike);
 router.route("/:commentId/delete").delete(verifyJWT, deleteComment);

export default router;