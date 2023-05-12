import express from 'express';
import cors from 'cors';
import { getDefinition, definitions } from './routes/definition';
import path from 'path';

const app = express();
// TODO: CORS for local development. Remove in production.
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = 3000;

app.get('/definition/:word', async (req, res) => {
  const { word } = req.params;

getDefinition(word)
.then((resp: definitions | undefined ) => {
  res.send(resp)
})
.catch((err: any) => {
  res.status(500).send('An error took place.');
  console.error(err)
})

});

app.listen(port, () => {
  console.log(`Server listening on:   http://localhost:${port}`);
});
