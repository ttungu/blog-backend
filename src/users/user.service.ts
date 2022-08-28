import { FilterQuery, HydratedDocument } from "mongoose";
import User, { UserInterace } from "./user.model";
// create
export const createUser = async (input: UserInterace): Promise<any> => {
    return await User.create(input);
};

export const getUser = async (
    filter: FilterQuery<UserInterace>
): Promise<any> => {
    return await User.findOne(filter);
};
