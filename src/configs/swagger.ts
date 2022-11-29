import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
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

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Express, port: number | string) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-type", "application/ json");
        res.send(swaggerSpec);
    });
};

export default swaggerDocs;
