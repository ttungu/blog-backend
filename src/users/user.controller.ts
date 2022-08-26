import { Request, Response } from "express";

export const index_get = (req: Request, res: Response) => {
    res.send("hello from index");
};
