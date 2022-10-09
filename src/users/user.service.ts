import { FilterQuery, HydratedDocument } from "mongoose";
import User, { UserInterace } from "./user.model";
// create
export const createUser = async (input: UserInterace): Promise<any> => {
    return await User.create(input);
};

export const getUser = async (
    filter1: FilterQuery<UserInterace>,
    filter2: FilterQuery<UserInterace>
): Promise<any> => {
    return await User.findOne({ $or: [filter1, filter2] });
};

export const getUsers = async (): Promise<UserInterace[]> => {
    return await User.find();
};

export const deleteUser = async (
    filter: FilterQuery<UserInterace>
): Promise<void> => {
    await User.findOneAndDelete();
};
