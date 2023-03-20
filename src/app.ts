import express, { Express } from "express";
import helmet from "helmet";
import indexRoutes from "./index/index.controller";
import v1Routes from "./routes/v1.route";
import logger from "morgan";
import "dotenv/config.js";
import "./configs/mongoConfig";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec, getSwaggerJson } from "./configs/swagger";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());

app.use("/api/v1", v1Routes);
app.use(helmet());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/docs.json", getSwaggerJson);

// NOTE: Leave index routes like this (so I know it can be done this way)
indexRoutes(app);

app.listen(port, () => {
    console.log(`Server started on port 3000.`);
});
