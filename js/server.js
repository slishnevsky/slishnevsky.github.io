import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import convert from 'xml-js'

const app = express();

app.use(cors())

app.get('/', async (req, res) => {
  const response = await fetch('https://news.knopka.ca/rss');
  const data = await response.text();
  const json = convert.xml2json(data);
  return json;
})

app.listen(3000, () => {
  console.log('listening on port 3000');
})