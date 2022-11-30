import { Request, Response } from "express";
import { getOnePost } from "../posts/posts.service";
import {
    getComments,
    getOneComment,
    createComment,
    deleteComment,
    updateComment,
} from "./comments.service";
import { body, validationResult } from "express-validator";

export const comments_get = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const comments = await getComments({ post: req.params.postid });
        res.json(comments);
    } catch (e: any) {
        throw new Error(e);
    }
};

export const comment_get = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { commentid } = req.params;
        const comment = await getOneComment({ _id: commentid });
        res.json(comment);
    } catch (e: any) {
        throw new Error(e);
    }
};

export const comment_create = [
    body("author")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Author can't be empty.")
        .isLength({ max: 100 })
        .withMessage("Author can't exceed 100 characters."),
    body("text")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Text can't be empty.")
        .isLength({ max: 1000 })
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
                const { author, text }: { author: string; text: string } = req.body;
                const { postid } = req.params;
                const post = await getOnePost({ _id: postid });
                if (post == null) {
                    res.status(400).send({
                        message: "Creating comment to non-existent post.",
                    });
                } else {
                    const comment = {
                        author,
                        text,
                        post: postid,
                    };
                    console.log(comment);
                    await createComment(comment);
                    res.json("Comment created.");
                }
            } catch (e: any) {
                throw new Error(e);
            }

        }
    }
]
export const comment_update = [
    body("author")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Author can't be empty.")
        .isLength({ max: 100 })
        .withMessage("Author can't exceed 100 characters."),
    body("text")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Text can't be empty.")
        .isLength({ max: 1000 })
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
                const { body } = req;
                const { commentid } = req.params;
                let updatedComment: object = {};
                for (const key in body) {
                    Object.assign(updatedComment, { [key]: body[key] });
                }
                console.log(updatedComment);
                await updateComment({ _id: commentid }, updatedComment);
                res.status(200).send("Comment updated");
            } catch (e: any) {
                throw new Error(e);
            }
        }
    }
]
export const comment_delete = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { commentid } = req.params;
        await deleteComment({ _id: commentid });
        res.status(200).send("Comment deleted");
    } catch (e: any) {
        throw new Error(e);
    }
};
