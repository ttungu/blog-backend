import { Schema, model, Types } from "mongoose";

export interface CommentInterface {
    author: string;
    text: string;
    date_created?: Date;
    date_edited?: Date;
    post: Types.ObjectId | string;
}

const CommentSchema = new Schema({
    author: { type: String, required: true, maxLength: 100 },
    text: { type: String, required: true, maxLength: 1000 },
    date_created: { type: Date, required: true, default: Date.now() },
    date_edited: { type: Date, default: Date.now() },
    post: { type: Types.ObjectId, ref: "Post" },
});

export default model<CommentInterface>("Comment", CommentSchema);
