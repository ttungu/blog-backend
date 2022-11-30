import { Request, Response, NextFunction } from "express";
import { PostInterface } from "./posts.model";
import { getComments } from "../comments/comments.service";
import {
    getPost,
    getOnePost,
    createPost,
    updatePost,
    deletePost,
} from "./posts.service";
import { body, validationResult } from "express-validator";

// get all posts
export const posts_get = [
    async (req: Request, res: Response): Promise<any> => {
        try {
            const found_posts: Array<PostInterface> = await getPost();
            found_posts == null
                ? res.status(404).send({ message: "No posts found." })
                : res.json(found_posts);
        } catch (e: any) {
            throw new Error(e);
        }
    }
]

//get one specific post (/:postid)
export const post_get = [
    async (req: Request, res: Response): Promise<any> => {
        try {
            const found_post = await getOnePost({
                _id: req.params.postid,
            });
            found_post == null
                ? res.status(404).send("Post not found.")
                : res.json(found_post);
        } catch (e: any) {
            throw new Error(e);
        }
    }
]

// create 1 post
export const post_create = [
    body("title")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Title can't be empty.")
        .isLength({ max: 100 })
        .withMessage("Title can't exceed 100 characters."),
    body("text")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Text can't be empty.")
        .isLength({ max: 1000 })
        .withMessage("Text can't exceed 1000 characters."),
    body("isPublished")
        .trim()
        .escape()
        .matches(/^(true|false)$/ig)
        .withMessage("Text can't exceed 1000 characters."),
    async (
        req: Request,
        res: Response
    ): Promise<any> => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).send(errors);
        } else {
            try {
                const {title, text, isPublished} = req.body
                const author = res.locals.authData.user._id
                const postToCreate = {
                    author, title, text, isPublished
                }
                createPost(postToCreate);
                res.status(200).send("Post inserted");
            } catch (e: any) {
                res.status(400).send("Bad request");
                throw new Error(e);
            }
        }
        
    }
]

// update 1 post
export const post_update = [
    body("title")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Title can't be empty.")
        .isLength({ max: 100 })
        .withMessage("Title can't exceed 100 characters."),
    body("text")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Text can't be empty.")
        .isLength({ max: 1000 })
        .withMessage("Text can't exceed 1000 characters."),
    body("isPublished")
        .trim()
        .escape()
        .matches(/^(true|false)$/ig)
        .withMessage("Text can't exceed 1000 characters."),
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).send(errors);
        } else {
            try {
                const { title, text, isPublished } = req.body;
                const { postid } = req.params;
                const author = res.locals.authData.user._id
                const post = {
                    author,
                    title,
                    text,
                    isPublished,
                    _id: postid,
                    date_edited: Date.now(),
                };
                const created_post = await updatePost(postid, post);
                res.status(200).send({ created_post });
            } catch (e: any) {
                throw new Error(e)
            }
        }
        
    }
]
// delete 1 post
export const post_delete = [
    async (
        req: Request,
        res: Response
    ): Promise<any> => {
        try {
            const { postid } = req.params;
            const comments = await getComments({ post: postid });
            if (Object.keys(comments).length === 0) {
                const deleted_post = deletePost({ _id: req.params.postid });
                res.status(200).send({ message: "Post deleted", deleted_post });
            } else {
                res.status(400).send({
                    message: "You must delete all the comments first",
                    comments,
                });
            }
        } catch (e: any) {
            throw new Error(e);
        }
    }
]