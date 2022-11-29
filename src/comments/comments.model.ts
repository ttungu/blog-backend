import { Schema, model, Types } from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      required:
 *        - author
 *        - text
 *        - post
 *      properties:
 *        author:
 *          type: string
 *        text:
 *          type: string
 *        post:
 *          type: string
 *        date_created:
 *          type: string
 *          format: date-time
 *        date_edited:
 *          type: string
 *          format: date-time
 *    CreateCommentInput:
 *      type: object
 *      required:
 *        - author
 *        - text
 *        - post
 *      properties:
 *        author:
 *          type: string
 *        text:
 *          type: string
 *        post:
 *          type: string
 *    UpdateCommentInput:
 *      type: object
 *      required:
 *        - author
 *        - text
 *        - post
 *      properties:
 *        author:
 *          type: string
 *        text:
 *          type: string
 *        post:
 *          type: string
 */

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
