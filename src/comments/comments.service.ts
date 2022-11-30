import { FilterQuery, UpdateQuery } from "mongoose";
import { PostInterface } from "../posts/posts.model";
import Comment, { CommentInterface } from "./comments.model";

// get comments
export const getComments = async (
    filter: FilterQuery<PostInterface>
): Promise<CommentInterface[]> => {
    try {
        return Comment.find(filter);
    } catch (e: any) {
        throw new Error(e);
    }
};

// get comment
export const getOneComment = async (
    filter: FilterQuery<CommentInterface>
): Promise<CommentInterface | null> => {
    try {
        return Comment.findOne();
    } catch (e: any) {
        throw new Error(e);
    }
};

// create comment
export const createComment = async (input: CommentInterface): Promise<any> => {
    try {
        return Comment.create(input);
    } catch (e: any) {
        throw new Error(e);
    }
};

// update comment
export const updateComment = async (
    filter: FilterQuery<CommentInterface>,
    updatedPost: UpdateQuery<CommentInterface>
) => {
    try {
        return Comment.updateOne(filter, updatedPost);
    } catch (e: any) {
        throw new Error(e);
    }
};

// delete comment
export const deleteComment = async (id: FilterQuery<CommentInterface>) => {
    try {
        return Comment.findOneAndDelete(id);
    } catch (e: any) {
        throw new Error(e);
    }
};
