import {Router} from "express";
import { 
    changeCurrentPassword,
    createUser,
    loginUser,
    logoutUser,
    refreshAccessToken
 } from "../controllers/user.Controller.js";
import { verifyJWT } from "../middlewares/auth.Middlewares.js";
import { upload } from "../middlewares/mullter.Middlerware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        }
    ]), 
    createUser
)
router.route("/login").post(loginUser)

// Protected route example
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)

export default router;