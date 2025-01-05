import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { allPosts, createPost , getUserPosts,getPostsById ,deletePost,likeAndUnlikePost,getLikesOfPost} from "../controllers/post.controller.js";


const router = Router();

router.post('/create',protectedRoute ,createPost);

router.get('/user',protectedRoute,getUserPosts);
router.get('/:id',protectedRoute,getPostsById );
router.delete('/delete/:id',protectedRoute,deletePost);
router.get('/', allPosts);
router.post("/like/:id",protectedRoute,likeAndUnlikePost);
router.get("/get-likes/:id",protectedRoute, getLikesOfPost);

    
export default router;