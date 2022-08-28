import { Request } from "express";

// extending REQ to have token (doesnt have by default)
export interface IGetTokenRequest extends Request {
    token: string;
}
