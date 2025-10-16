import {Router} from "express";
import { 
    changeCurrentPassword,
    createUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updateAccountDetails,
    updateAvatar,
    updateCoverImage
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
router.route("/update-account").put(verifyJWT, updateAccountDetails)
router.route("/update-avatar").put(verifyJWT, upload.single("avatar"), updateAvatar);
router.route("/update-cover-image").put(verifyJWT, upload.single("coverImage"), updateCoverImage)

export default router;