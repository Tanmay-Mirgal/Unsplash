import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { followUser, getFollowers, getFollowing, getUser,  unfollowUser } from "../controllers/user.controller.js";

const router = Router();



router.get('/get-user/:id',protectedRoute,getUser);
router.post('/follow-user/:id',protectedRoute,followUser);
router.post('/unfollow-user/:id',protectedRoute,unfollowUser);
router.get('/get-followers',protectedRoute,getFollowers);
router.get('/get-following/:id',protectedRoute,getFollowing);



export default router;