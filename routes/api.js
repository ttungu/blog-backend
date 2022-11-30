const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

router.get("/", user_controller.user_index);

// user
//signup
router.post("/signup", user_controller.user_singup_post);

//login
router.post("/login", user_controller.user_login_post);

//upload
router.post("/upload", user_controller.user_upload_post);

//download
router.get("/download", user_controller.user_download_get);

//testing token/user verification
router.get("/test", user_controller.user_test_get);

// post
// get all posts
router.get("/posts", post_controller.posts_get);

// get 1 post
router.get("/posts/:postid", post_controller.post_get);

// create post
router.post("/posts/", post_controller.post_post);

//update post
router.put("/posts/:postid", post_controller.post_put);

//delete post
router.delete("/posts/:postid", post_controller.post_delete);

// comments
//get all comments
router.get("/posts/:postid/comments", comment_controller.comments_get);

//get 1 comment
router.get(
  "/posts/:postid/comments/:commentid",
  comment_controller.comment_get
);

//create comment
router.post("/posts/:postid/comments", comment_controller.comment_post);

//update comment
router.put(
  "/posts/:postid/comments/:commentid",
  comment_controller.comment_put
);

// delete comment
router.delete(
  "/posts/:postid/comments/:commentid",
  comment_controller.comment_delete
);

module.exports = router;
