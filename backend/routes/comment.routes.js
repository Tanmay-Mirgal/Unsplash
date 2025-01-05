import { Router } from "express";
import { deleteComment, getCommentsOfPosts, postComment } from "../controllers/comment.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";


const router = new Router();

router.post("/add-comment/:id",protectedRoute, postComment);
router.get("/get-comments/:id",protectedRoute,getCommentsOfPosts)
router.delete("/delete-comment/:id",protectedRoute,deleteComment)

export default router;
