import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.Middlewares.js";

import {
    createNotification,
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification
} from "../controllers/notification.Controller.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT to all routes

router.route("/")
    .post(createNotification)
    .get(getUserNotifications);

router.route("/:id/read").patch(markNotificationAsRead);
router.route("/:id").delete(deleteNotification);

export default router;