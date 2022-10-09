import express from "express";
import * as postController from "../posts/posts.controller";
import * as commentController from "../comments/comments.controller";
import * as userController from "../users/user.controller";
const router = express.Router();

/* USER */
//get
router.get("/", userController.index_get);

//create
router.post("/signup", userController.user_signup);

//login
router.post("/login", userController.user_login);

//delete

// get users
router.get("/users", userController.users_get);

/* POSTS */
//get all posts
router.get("/posts", postController.posts_get);

//get 1 post
router.get("/posts/:postid", postController.post_get);

//create
router.post("/posts", postController.post_create);

//update
router.put("/posts/:postid", postController.post_update);

//delete
router.delete("/posts/:postid", postController.post_delete);

/* COMMENTS */
//get all
router.get("/posts/:postid/comments", commentController.comments_get);

//get 1
router.get("/posts/:postid/comments/:commentid", commentController.comment_get);

//create
router.post("/posts/:postid/comments", commentController.comment_create);

//update
router.put(
    "/posts/:postid/comments/:commentid",
    commentController.comment_update
);

//delete
router.delete(
    "/posts/:postid/comments/:commentid",
    commentController.comment_delete
);

export default router;
