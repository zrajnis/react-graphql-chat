require('dotenv-safe').load()

const http = require('http')
const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const cors = require('cors')
const schema = require('schema')

const { CLIENT_URL, PORT } = process.env
const app = express()
const server = new ApolloServer({ schema })

app.use(cors({
  credentials: true,
  origin: CLIENT_URL
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

server.applyMiddleware({ app })

const httpServer = http.createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`Subscriptions listening on ws://localhost:${PORT}${server.subscriptionsPath}`)
})
