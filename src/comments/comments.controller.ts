import { Request, Response } from "express";
import { getOnePost } from "../posts/posts.service";
import {
    getComments,
    getOneComment,
    createComment,
    deleteComment,
    updateComment,
} from "./comments.service";

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

export const comment_create = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { author, text }: { author: string; text: string } = req.body;
    const { postid } = req.params;
    try {
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
};

export const comment_update = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { body } = req;
        const { commentid } = req.params;
        let updatedComment: object = {};
        for (const key in body) {
            Object.assign(updatedComment, { [key]: body[key] });
        }
        await updateComment({ _id: commentid }, updatedComment);
        res.status(200).send("Comment updated");
    } catch (e: any) {
        throw new Error(e);
    }
};

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
