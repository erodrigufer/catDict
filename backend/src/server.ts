import express from 'express';
import winston from 'winston';
import cors from 'cors';
import helmet from "helmet";
import compression from "compression";
import definition from './routes/definition';
import path from 'path';
import handleInternalServerError from './middleware/internalServerError';

import setupLogging from './startup/logging';
import isDevEnv from './util/detectNodeEnv';

setupLogging();

const app = express();

if (isDevEnv()) {
  winston.info(`Server running in dev mode.`);
// TODO: fix CORS issues when not running in prod
// Only use cors if in dev mode.
}else{
  winston.info(`Server running in prod mode.`);
}

app.use(cors());
// Middlewares for production: helmet to secure headers
// and compression to compress responses.
app.use(helmet());
app.use(compression());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Serve HTTP at port 80.
const port = 80;

// Define routes.
app.use('/v1/api/definition',definition);

// Handle an internal server error, this middleware would be activated if any other
// route or middleware executes the next() function.
app.use(handleInternalServerError);

app.listen(port, () => {
  winston.info(`Server listening on port :${port}`);
});
