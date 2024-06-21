import { Router } from "express";
import passport from 'passport';
import { updateProfile } from "../controller/profile.controller.js";
import { verifyToken } from "../middleware/verifytoken.middleware.js";
const router = Router();

router.put("/",verifyToken , updateProfile);

export default router;
