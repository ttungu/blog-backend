import { FilterQuery, UpdateQuery } from "mongoose";
import Post, { PostInterface } from "./posts.model";

// get all posts from DB
export const getPost = async (): Promise<PostInterface[]> => {
    try {
        return Post.find();
    } catch (e: any) {
        throw new Error(e);
    }
};

// get one post - specify filter
export const getOnePost = async (
    filter: FilterQuery<PostInterface>
): Promise<PostInterface | null> => {
    try {
        return Post.findOne(filter);
    } catch (e: any) {
        throw new Error(e);
    }
};

// create post - input must be Object (not instance method of the model - i.e. const post = new Post({}));
export const createPost = async (input: PostInterface): Promise<any> => {
    try {
        return Post.create(input);
    } catch (e: any) {
        throw new Error(e);
    }
};

// update post - specify filter
export const updatePost = async (
    id: any,
    updatedPost: UpdateQuery<PostInterface>
): Promise<any> => {
    try {
        const post = new Post(updatedPost);
        await Post.findByIdAndUpdate(id, post);
    } catch (e: any) {
        throw new Error(e);
    }
};

// delete post - specify filter
export const deletePost = async (
    filter: FilterQuery<PostInterface>
): Promise<any> => {
    try {
        return Post.deleteOne(filter);
    } catch (e: any) {
        throw new Error(e);
    }
};
