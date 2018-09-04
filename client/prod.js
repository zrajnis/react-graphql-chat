require('dotenv-safe').load()

const express = require('express')
const path = require('path')

const { PORT } = process.env
const staticDir = path.join(__dirname, 'dist')
const staticIndex = path.join(staticDir, 'index.html')
const app = express()

app.use(express.static(staticDir))
app.use((req, res) => res.sendFile(staticIndex))

app.listen(PORT, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.log(`Listening on port ${PORT}`)
  }
})
