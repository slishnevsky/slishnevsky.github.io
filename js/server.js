
import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/api', async (req, res) => {
  const response = await fetch('https://news.knopka.ca/rss')
  const data = response.json()
  res.json(data)
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})