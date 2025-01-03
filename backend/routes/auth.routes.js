import { Router } from "express";
import { login, logout, profile, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.get('/profile',protectedRoute,profile); 
router.put("/update-profile",protectedRoute,updateProfile);



export default router;