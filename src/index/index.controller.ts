import { Express, Request, Response } from "express";

function routes(app: Express) {
    app.get("/", (req: Request, res: Response) => {
        res.redirect("/api/v1/");
    });

    app.get("/api", (req: Request, res: Response) => {
        res.redirect("/api/v1/");
    });

    // app.use("*", (req: Request, res: Response) => {
    //     res.status(404).send("Something went wrong.");
    // });
}

export default routes;
