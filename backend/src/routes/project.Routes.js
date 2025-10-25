import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.Middlewares.js";
import { upload } from "../middlewares/mullter.Middlerware.js";
import {
    createProject,
    deleteProject,
    getAllProjects,
    getProjectById,
    getProjectByUsername,
    updateProject
} from "../controllers/project.Controller.js";

const router = Router();

router.route("/create-project").post(verifyJWT, upload.single("thumbnail"), createProject);
router.route("/all-projects").get(verifyJWT, getAllProjects);
router.route("/:projectId").get(verifyJWT, getProjectById);
router.route("/user/:username").get(verifyJWT, getProjectByUsername);
router.route("/update-project/:projectId").put(verifyJWT, upload.single("thumbnail"), updateProject);
router.route("/delete-project/:projectId").delete(verifyJWT, deleteProject);


export default router;
