import express from "express";
import * as postController from "../posts/posts.controller";
import * as commentController from "../comments/comments.controller";
import * as userController from "../users/user.controller";
import {checkHeaderForToken} from "../middleware/jwt"
const router = express.Router();



/* INDEX */

/**
 * @openapi
 * /index:
 *  get:
 *     tags:
 *     - Index
 *     description: Does nothing
 *     responses:
 *       200:
 *         description: Exists
 */
router.get("/", userController.index_get);


/* USER */
/**
 * @openapi
 * '/api/v1/signup':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *      400:
 *        description: Bad request
 */
//create
router.post("/signup", userController.user_signup);

/**
 * @openapi
 * '/api/v1/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserPost'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      400:
 *        description: Bad request
 */
//login
router.post("/login", userController.user_login);

/**
 * @openapi
 * '/api/v1/delete':
 *  post:
 *     tags:
 *     - User
 *     summary: Delete a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              oneOf:
 *                  - $ref: '#/components/schemas/EmailDeleteInput'
 *                  - $ref: '#/components/schemas/UsernameDeleteInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteUserResponse'
 *      400:
 *        description: Bad request
 */
//delete
router.post("/delete", checkHeaderForToken, userController.user_delete);

/**
 * @openapi
 * /api/v1/users:
 *  get:
 *     tags:
 *     - User
 *     summary: Get all users
 *     responses:
 *       403:
 *         description: Unauthorized
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUsersResponse'
 */
// get users
router.get("/users", checkHeaderForToken, userController.users_get);

/* POSTS */
/**
 * @openapi
 * /api/v1/posts:
 *  get:
 *     tags:
 *     - Post
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Post'
 *       404:
 *         description: Posts not found
 */
//get all posts
router.get("/posts", postController.posts_get);

/**
 * @openapi
 * '/api/v1/posts/{postid}':
 *  get:
 *     tags:
 *     - Post
 *     summary: Get a single post by the postid
 *     parameters:
 *      - name: postid
 *        in: path
 *        description: The id of the post
 *        required: true
 *        default: 62e4f8604b3811b4e30ddfea
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
//get 1 post
router.get("/posts/:postid", postController.post_get);

/**
 * @openapi
 * '/api/v1/posts':
 *  post:
 *     tags:
 *     - Post
 *     summary: Create a post
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request
 */
//create
router.post("/posts", postController.post_create);

/**
 * @openapi
 * '/api/v1/posts/{postid}':
 *  post:
 *     tags:
 *     - Post
 *     summary: Update a post
 *     parameters:
 *      - name: postid
 *        in: path
 *        description: The id of the post
 *        required: true
 *        default: 62e4f8604b3811b4e30ddfea
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request
 */
//update
router.put("/posts/:postid", postController.post_update);

/**
 * @openapi
 * '/api/v1/posts/{postid}':
 *  delete:
 *     tags:
 *     - Post
 *     summary: Delete a post
 *     parameters:
 *      - name: postid
 *        in: path
 *        description: The id of the post
 *        required: true
 *        default: 62e4f8604b3811b4e30ddfea
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Post deleted
 *                  deleted_post:
 *                      $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request
 */
//delete
router.delete("/posts/:postid", postController.post_delete);

/* COMMENTS */

/**
 * @openapi
 * /api/v1/posts/{postid}/comments:
 *  get:
 *     tags:
 *     - Comment
 *     summary: Get all comments
 *     parameters:
 *      - name: postid
 *        in: path
 *        description: The id of the post
 *        required: true
 *        default: 62e4f8604b3811b4e30ddfea
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comments not found
 */
//get all
router.get("/posts/:postid/comments", commentController.comments_get);

/**
 * @openapi
 * '/api/v1/posts/{postid}/comments/{commentid}':
 *  get:
 *     tags:
 *     - Comment
 *     summary: Get a single comment by the commentid
 *     parameters:
 *      - name: postid
 *        in: path
 *        description: The id of the post
 *        required: true
 *        default: 62e4f8604b3811b4e30ddfea
 *      - name: commentid
 *        in: path
 *        description: The id of the comment
 *        required: true
 *        default: 62e4f9b64b3811b4e30ddffc
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */
router.get("/posts/:postid/comments/:commentid", commentController.comment_get);

/**
 * @openapi
 * '/api/v1/posts/{postid}/comments':
 *  post:
 *     tags:
 *     - Comment
 *     summary: Create a comment
 *     parameters:
 *      - name: postid
 *        in: path
 *        description: The id of the post
 *        required: true
 *        default: 62e4f8604b3811b4e30ddfea
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateCommentInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request
 */
//create
router.post("/posts/:postid/comments", commentController.comment_create);

/**
 * @openapi
 * '/api/v1/posts/{postid}/comments/{commentid}':
 *  post:
 *     tags:
 *     - Comment
 *     summary: Update a comment
 *     parameters:
 *      - name: postid
 *        in: path
 *        description: The id of the post
 *        required: true
 *        default: 62e4f8604b3811b4e30ddfea
 *      - name: commentid
 *        in: path
 *        description: The id of the comment
 *        required: true
 *        default: 62e4f9b64b3811b4e30ddffc
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdateCommentInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request
 */
//update
router.put(
    "/posts/:postid/comments/:commentid",
    commentController.comment_update
);

/**
 * @openapi
 * '/api/v1/posts/{postid}/comments/{commentid}':
 *  delete:
 *     tags:
 *     - Comment
 *     summary: Delete a comment
 *     parameters:
 *      - name: postid
 *        in: path
 *        description: The id of the post
 *        required: true
 *        default: 62e4f8604b3811b4e30ddfea
 *      - name: commentid
 *        in: path
 *        description: The id of the comment
 *        required: true
 *        default: 62e4f9b64b3811b4e30ddffc
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Comment deleted
 *                  deleted_comment:
 *                      $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request
 */
//delete
router.delete(
    "/posts/:postid/comments/:commentid",
    commentController.comment_delete
);

export default router;
