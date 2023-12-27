import express from "express";
import winston from "winston";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import definition from "./routes/definition";
import path from "path";
import handleInternalServerError from "./middleware/internalServerError";

import setupLogging from "./startup/logging";
import isDevEnv from "./util/detectNodeEnv";
import login from "./routes/login";
import checkEnvVariables from "./startup/env";
import generateRandomAuthToken from "./util/crypto";

setupLogging();
try {
  checkEnvVariables();
} catch (err) {
  console.error(err);
  // If env variables are missing, exit application.
  process.exit(1);
}

export const AUTH_TOKEN = generateRandomAuthToken(60);

const app = express();

if (isDevEnv()) {
  winston.info(`Server running in dev mode.`);
  // Only use cors if in dev mode.
  app.use(
    cors({
      exposedHeaders: ["x-auth-token"],
      credentials: true,
    }),
  );
} else {
  // Match any subdomain with at least one character (.{1,0}) or match the exact URL
  // https://erodriguez.de, in other words allow requests coming from this addresses.
  app.use(
    cors({
      origin: [/https:\/\/.{1,}\.erodriguez\.de/, "https://erodriguez.de"],
      exposedHeaders: ["x-auth-token"],
    }),
  );
  winston.info(`Server running in prod mode.`);
}

// Middlewares for production: helmet to secure headers
// and compression to compress responses.
// De-activate some security options, because otherwise,
// helmet forces the browser to request some resources
// (like js scripts) only through a secure HTTPS conn.
// Only until the HTTPS deployment possible this options
// should be activated again.
app.use(
  helmet({
    contentSecurityPolicy: false,
    strictTransportSecurity: false,
  }),
);
app.use(compression());

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Define routes.
app.use("/v1/api/definition", definition);
app.use("/v1/api/login", login);

// Handle an internal server error, this middleware would be activated if any other
// route or middleware executes the next() function.
app.use(handleInternalServerError);

// Serve HTTP at port 80.
const port = 80;

app.listen(port, () => {
  winston.info(`Server listening on port :${port}`);
});
