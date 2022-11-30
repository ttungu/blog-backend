import { NextFunction } from "express";
import { JwtPayload, verify, sign } from "jsonwebtoken";
import { UserInterace } from "../users/user.model";
import { RequestCustom } from "../types/RequestCustom";
import { ResponseCustom } from "../types/ResponseCustom";

// see if headers have jwt token (bearer) and assign token
export const checkHeaderForToken = (
    req: any,
    res: any,
    next: NextFunction
): void => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(" ");
            req.token = bearer[1];
            next();
        } else {
            res.sendStatus(403);
        }
    } catch (e: any) {
        throw new Error();
    }
};

//verify user's token
export const verifyUserToken = (
    token: string,
    req: RequestCustom,
    res: ResponseCustom,
    next: NextFunction
): string | JwtPayload | void => {
    try {
        if (process.env.JWT_SECRET !== undefined) {
            const authData = verify(token, process.env.JWT_SECRET);
            console.log(authData);
            res.locals.authData = authData;
            next();
        } else {
            console.log("hmmm");
            return next(new Error("JWT_SECRET is undefined."));
        }
    } catch (err: any) {
        return next(err);
    }
};

export const signUser = (user: UserInterace): string | undefined => {
    try {
        if (process.env.JWT_SECRET != undefined) {
            const token = sign({ user }, process.env.JWT_SECRET);
            return token;
        } else {
            return;
        }
    } catch (e: any) {
        throw new Error(e);
    }
};
