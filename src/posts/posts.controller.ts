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

// get all posts
export const posts_get = async (req: Request, res: Response): Promise<any> => {
    try {
        const found_posts: Array<PostInterface> = await getPost();
        found_posts == null
            ? res.status(404).send({ message: "No posts found." })
            : res.json(found_posts);
    } catch (e: any) {
        throw new Error(e);
    }
};

//get one specific post (/:postid)
export const post_get = async (req: Request, res: Response): Promise<any> => {
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
};

// create 1 post
// TODO - get authData from req.token after jwt verification -> assign to "author":"ObjectId"
export const post_create = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        createPost(req.body);
        res.status(200).send("Post inserted");
    } catch (e: any) {
        res.status(400).send("Bad request");
        throw new Error(e);
    }
};

// update 1 post
export const post_update = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { author, title, text, isPublished } = req.body;
    const { postid } = req.params;
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
};

// delete 1 post
export const post_delete = async (
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
};
