import express from "express";

declare global {
  namespace Express {
    interface Request {
        bearerHeader?: string,
        token?: string,

    }
  }
}