import { Schema, model } from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: email@example.com
 *        username:
 *          type: string
 *          default: jane
 *        password:
 *          type: string
 *          default: pwd123
 *
 *    EmailDeleteInput:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: email@example.com
 *
 *    UsernameDeleteInput:
 *      type: object
 *      required:
 *        - username
 *      properties:
 *        username:
 *          type: string
 *          default: jane
 *
 *    DeleteUserResponse:
 *      type: object
 *      properties:
 *          deleted_user:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 *                  email:
 *                      type: string
 *                  __v:
 *                      type: number
 *
 *    LoginUserPost:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: jane
 *        password:
 *          type: string
 *          default: pwd123
 *
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        token:
 *          type: string
 *    GetUsersResponse:
 *      type: object
 *      properties:
 *        users:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 *                  email:
 *                      type: string
 *                  __v:
 *                      type: number
 */

export interface UserInterace {
    username: string;
    password: string;
    email: string;
}

const UserSchema = new Schema({
    username: {
        type: String,
        requred: true,
        maxLEngth: 100,
        unique: true,
        dropDubs: true,
    },
    password: { type: String, required: true, maxLength: 100 },
    email: { type: String, required: true, maxLength: 100 },
});

export default model<UserInterace>("User", UserSchema);
