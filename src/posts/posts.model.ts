import { Schema, model, Types, Document } from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      required:
 *        - author
 *        - title
 *        - text
 *        - isPublished
 *      properties:
 *        author:
 *          type: string
 *        title:
 *          type: string
 *        text:
 *          type: string
 *        date_created:
 *          type: string
 *          format: date-time
 *        date_edited:
 *          type: string
 *          format: date-time
 *        isPublished:
 *          type: boolean
 *
 *    CreatePostInput:
 *      type: object
 *      required:
 *        - author
 *        - title
 *        - text
 *        - isPublished
 *      properties:
 *        author:
 *          type: string
 *          default: 63808e97af4d93aa971145f8
 *        title:
 *          type: string
 *          default: title
 *        text:
 *          type: string
 *          default: Some text
 *        isPublished:
 *          type: boolean
 *          default: true
 *
 *    UpdatePostInput:
 *      type: object
 *      required:
 *        - author
 *        - title
 *        - text
 *        - isPublished
 *      properties:
 *        author:
 *          type: string
 *          default: 63808e97af4d93aa971145f8
 *        title:
 *          type: string
 *          default: title
 *        text:
 *          type: string
 *          default: Some text
 *        isPublished:
 *          type: boolean
 *          default: true
 *
 */
export interface PostInterface {
    author: Types.ObjectId;
    title: string;
    text: string;
    date_created?: Date;
    date_edited?: Date;
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
