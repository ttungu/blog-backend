import { NextFunction, Request, Response } from "express";
import { getUser, createUser } from "./user.service";
import * as bcrypt from "bcryptjs";
import {
    checkHeaderForToken,
    verifyUserToken,
    signUser,
} from "../middleware/jwt";

export const index_get = [
    (req: any, res: Response, next: NextFunction) => {
        checkHeaderForToken(req, res, next);
    },
    (req: any, res: any, next: NextFunction) => {
        const { token } = req;
        verifyUserToken(token, req, res, next);
    },
    (req: any, res: Response) => {
        const { authData } = res.locals;
        res.json({ message: "Hello form index", authData });
    },
];

export const user_signup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { username, password } = req.body;
        const found_user = await getUser({ username });
        if (found_user == null) {
            //bcrypt - vytvor uzivatele
            bcrypt.hash(password, 10, async (err, hashedPwd) => {
                if (err) return next(err);
                const user = {
                    username,
                    password: hashedPwd,
                };
                await createUser(user);
                res.json({ message: "User created" });
            });
        } else {
            res.status(400).send({ message: "User already exists." });
        }
    } catch (e: any) {
        throw new Error(e);
    }
};

export const user_login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { username, password } = req.body;
        const found_user = await getUser({ username });
        // check if user exists
        if (found_user != null) {
            //check pwd
            const isCorrectPwd = await checkPassword(
                password,
                found_user.password,
                next
            );
            console.log(isCorrectPwd);
            if (isCorrectPwd) {
                // sign user (jwt)
                const token = signUser(found_user);
                console.log(token);
                res.json({
                    message: "User logged in.",
                    token,
                });
            } else {
                res.status(400).send({ message: "Invalid password" });
            }
        } else {
            res.status(400).send({ message: "User not found." });
        }
    } catch (e: any) {
        throw new Error(e);
    }
};

const checkPassword = async (
    pwd: string,
    hashedPwd: string,
    next: NextFunction
): Promise<boolean> => {
    try {
        return bcrypt.compare(pwd, hashedPwd);
    } catch (e: any) {
        throw new Error(e);
    }
};
