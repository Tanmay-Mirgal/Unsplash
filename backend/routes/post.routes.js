import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { allPosts, createPost , getUserPosts,UserPostsById,deletePost} from "../controllers/post.controller.js";


const router = Router();

router.post('/create',protectedRoute ,createPost);

router.get('/user',protectedRoute,getUserPosts);
router.get('/:id',protectedRoute,UserPostsById);
router.delete('/:id',protectedRoute,deletePost);
router.get('/', allPosts);
    
export default router;