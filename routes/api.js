const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController')
const post_controller = require('../controllers/postController')
const comment_controller = require('../controllers/commentController')

router.get('/', user_controller.user_index);

// user
//signup
router.post('/signup', user_controller.user_singup_post);

//login
router.post('/login', user_controller.user_login_post);

//testing token/user verification
router.get('/test', verifyToken, user_controller.user_test_get);

// post
// get all posts
router.get('/posts', verifyToken, post_controller.posts_get);

// get 1 post
router.get('/posts/:postid', verifyToken, post_controller.post_get);

// create post
router.post('/posts/', verifyToken, post_controller.post_post);

//update post
router.put('/posts/:postid',verifyToken,  post_controller.post_put);

//delete post
router.delete('/posts/:postid', verifyToken, post_controller.post_delete);

// comments
//get all comments
router.get('/posts/:postid/comments', verifyToken, comment_controller.comments_get);

//get 1 comment
router.get('/posts/:postid/comments/:commentid', verifyToken, comment_controller.comment_get);

//create comment
router.post('/posts/:postid/comments', verifyToken, comment_controller.comment_post);

//update comment
router.put('/posts/:postid/comments/:commentid', verifyToken, comment_controller.comment_put);

// delete comment
router.delete('/posts/:postid/comments/:commentid', verifyToken, comment_controller.comment_delete);



// see if headers have jwt token (bearer) and assign token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        req.token = bearer[1];
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;