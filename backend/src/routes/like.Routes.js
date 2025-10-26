import { Router } from "express";
import {
    getLikes,
    toggleLike
} from "../controllers/like.Controller.js";
import { verifyJWT } from "../middlewares/auth.Middlewares.js";

const router = Router();

router.route("/toggle-like").post(verifyJWT, toggleLike)
router.route("/get-like").get(verifyJWT, getLikes);

export default router;