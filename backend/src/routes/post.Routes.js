import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.Middlewares.js";
import { upload } from "../middlewares/mullter.Middlerware.js";
import { 
    createPost,
    editPost,

 } from "../controllers/post.Controller.js";

 const router = Router();

 router.route("/post").post(verifyJWT, upload.single("image"), createPost);
 router.route("/post/:postId").put(verifyJWT, editPost)

 export default router;