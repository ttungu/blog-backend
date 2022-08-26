import express, { Express } from "express";
import helmet from "helmet";
import indexRoutes from "./index/index.controller";
import v1Routes from "./routes/v1.route";
import logger from "morgan";
import "dotenv/config.js";
import "./configs/mongoConfig";

const app: Express = express();
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());

app.use("/api/v1", v1Routes);

// NOTE: Leave index routes like this (so I know it can be done this way)
indexRoutes(app);

app.listen(3000, () => {
    console.log(`Server started on port 3000.`);
});
