require('dotenv-safe').load()

const http = require('http')
const { ApolloServer } = require('apollo-server-express')
const express = require('express')

const schema = require('schema')

const { PORT } = process.env
const app = express()
const server = new ApolloServer({ schema })

server.applyMiddleware({ app })

const httpServer = http.createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`Subscriptions listening on ws://localhost:${PORT}${server.subscriptionsPath}`)
})
