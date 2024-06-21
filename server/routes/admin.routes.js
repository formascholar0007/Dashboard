import { Router } from "express";
import { createProject } from "../controller/admin.controller.js";
import { verifyToken } from "../middleware/verifytoken.middleware.js";
import { authorizeAdmin } from "../middleware/authorizeAdmin.middleware.js";

const router = Router();

// projects
router.post("/project", verifyToken, authorizeAdmin, createProject);

export default router;
