import { Router } from "express";

import {
    getFollowers,
    getFollowing,
    removeFollower,
    toggleFollow
} from "../controllers/follow.Controller.js";
import { verifyJWT } from "../middlewares/auth.Middlewares.js";

const router = Router();

router.route("/toggle-follow/:targetUserId").post(verifyJWT, toggleFollow);
router.route("/followers/:userId").get(verifyJWT, getFollowers);
router.route("/following/:userId").get(verifyJWT, getFollowing);
router.route("/remove-follower/:userId").delete(verifyJWT, removeFollower);

export default router;