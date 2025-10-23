import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.Middlewares.js";
import { upload } from "../middlewares/mullter.Middlerware.js";
import { 
    createPost,
    deletePost,
    editPost,
    getPostById,
    getPostsByUsername,
    getUserAllPosts,
    getUserFeed,
    togglePinnedPost,

 } from "../controllers/post.Controller.js";

 const router = Router();

 router.route("/post").post(verifyJWT, upload.single("image"), createPost);
 router.route("/post/:postId").put(verifyJWT, editPost)
 router.route("/post/:postId").delete(verifyJWT, deletePost)
 router.route("/post/:postId").get(verifyJWT, getPostById)
 router.route("/feed").get(verifyJWT, getUserFeed)
 router.route("/:username").get(verifyJWT, getPostsByUsername)
 router.route("/user-profile/posts").get(verifyJWT, getUserAllPosts)
 router.route("/post/pin/:postId").patch(verifyJWT, togglePinnedPost)

 export default router;