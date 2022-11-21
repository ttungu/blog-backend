import { NextFunction, Request, Response } from "express";
import { getUser, createUser, getUsers, deleteUser } from "./user.service";
import { sendRegEmail } from "../middleware/mail";
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

//
export const user_signup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { username, password, email } = req.body;
        const found_user = await getUser({ username }, { email });
        if (found_user == null) {
            //bcrypt - vytvor uzivatele
            bcrypt.hash(password, 10, async (err, hashedPwd) => {
                if (err) return next(err);
                const user = {
                    username,
                    password: hashedPwd,
                    email,
                };
                await createUser(user);
                res.json({ message: "User created" });
            });
            await sendRegEmail(email, username);
        } else {
            res.status(400).send({ message: "User already exists." });
        }
    } catch (e: any) {
        throw new Error(e);
    }
};

// login either with username or email
export const user_login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { username, password } = req.body;
        const found_user = await getUser({ username }, { email: username });
        // check if user exists
        if (found_user != null) {
            //check pwd
            const isCorrectPwd = await checkPassword(
                password,
                found_user.password
            );
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

export const users_get = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const users = await getUsers();
        res.json({ users });
    } catch (e: any) {
        throw new Error(e);
    }
};
// FINISH THIS - TODO
// export const user_delete = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     try {
//         const { username, email, password } = req.body;
//         const found_user = await getUser({ username }, { email });
//         if (found_user != null) {
//             await deleteUser(username);
//         }

//     } catch (e: any) {
//         throw new Error(e);
//     }
// };

const checkPassword = async (
    pwd: string,
    hashedPwd: string
): Promise<boolean> => {
    try {
        return bcrypt.compare(pwd, hashedPwd);
    } catch (e: any) {
        throw new Error(e);
    }
};
