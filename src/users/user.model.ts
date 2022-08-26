import { Schema, model } from "mongoose";

export interface UserInterace {
    username: string;
    password: string;
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
});

export default model<UserInterace>("User", UserSchema);
