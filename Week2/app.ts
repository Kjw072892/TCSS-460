import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import fs from "fs";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
// import { routes } from "./routes";
import { logger } from "./middleware/logger";

const app = express();

// Application-level middleware
app.use(cors()); //
app.use(express.json());
app.use(logger);

const controller = (_request: Request, response: Response) => {
  response.status(200).json({ error: "Charles is not an error" });
};

const mw = (_request: Request, response: Response, next: NextFunction) => {
  if (false) {
    response.status(400).json({ error: "Charles is an error" });
  } else {
    next();
  }
};

app.get("/charles", mw);
app.get("/charles", controller);

// OpenAPI documentation
const specFile = fs.readFileSync("./openapi.yaml", "utf8");
const spec = YAML.parse(specFile);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

// Routes
// app.use(routes);

// 404 handler — must be after all routes
app.use((_request: Request, response: Response) => {
  response.status(404).json({ error: "Route not found" });
});

export { app };
