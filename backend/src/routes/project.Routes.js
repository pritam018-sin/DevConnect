import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.Middlewares.js";
import { upload } from "../middlewares/mullter.Middlerware.js";
import {
    createProject,
    getAllProjects,
    getProjectById
} from "../controllers/project.Controller.js";

const router = Router();

router.route("/create-project").post(verifyJWT, upload.single("thumbnail"), createProject);
router.route("/all-projects").get(verifyJWT, getAllProjects);
router.route("/:projectId").get(verifyJWT, getProjectById);


export default router;
