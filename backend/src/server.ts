import express from 'express';
import cors from 'cors';
import definition from './routes/definition';
import path from 'path';
import handleInternalServerError from './middleware/internalServerError';

const app = express();
// TODO: CORS for local development. Remove in production.
app.use(cors());
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
  console.log(`Server listening on:   http://0.0.0.0:${port}`);
});
