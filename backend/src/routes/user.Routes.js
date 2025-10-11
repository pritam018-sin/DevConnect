import {Router} from "express";
import { createUser } from "../controllers/user.Controller.js";
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

export default router;