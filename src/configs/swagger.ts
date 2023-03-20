import express, { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API docs",
            version,
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
        },
    },
    apis: [
        "./src/routes/v1.route.ts",
        "./src/users/*.model.ts",
        "./src/posts/*.model.ts",
        "./src/comments/*.model.ts",
    ],
};
const app: Express = express();

export const swaggerSpec = swaggerJsdoc(options);

export const getSwaggerJson = (req: Request, res: Response) => {
    res.setHeader("Content-type", "Application/json");
    res.send(swaggerSpec);
};
