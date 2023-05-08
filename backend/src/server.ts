import express from 'express';
import cors from 'cors';
import { getDefinition, definitions } from './routes/definition';

const app = express();
// TODO: CORS for local development. Remove in production.
app.use(cors());
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
  console.log(`Server listening on port ${port}`);
});
