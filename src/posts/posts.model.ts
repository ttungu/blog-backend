import { Schema, model, Types, Document } from "mongoose";
export interface PostInterface {
    author: Types.ObjectId;
    title: string;
    text: string;
    date_created: Date;
    date_edited: Date;
    isPublished: boolean;
}

const PostSchema = new Schema<PostInterface>({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true, maxLength: 100 },
    text: { type: String, required: true, maxLength: 1000 },
    date_created: { type: Date, required: true, default: Date.now() },
    date_edited: { type: Date, default: Date.now() },
    isPublished: { type: Boolean, required: true },
});

export default model<PostInterface>("Post", PostSchema);
