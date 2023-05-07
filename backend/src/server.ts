import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
// TODO: CORS for local development. Remove in production.
app.use(cors());
const port = 3000;

app.get('/definition/:word', async (req, res) => {
  const { word } = req.params;
//   const url = `https://www.dictionary.com/browse/${word}`;

//   try {
//     const response = await axios.get(url);
//     res.send(response.data);
//   } catch (error) {
//     // res.status(500).send(error.message);
//     res.status(500).send('An error took place.');
//   }

res.send(word)

});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
