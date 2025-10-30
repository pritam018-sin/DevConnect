import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.Middlewares.js";

import {
    createNotification
} from  "../controllers/notification.Controller.js";

const router = Router();

router.route("/").post(verifyJWT, createNotification);

export default router;