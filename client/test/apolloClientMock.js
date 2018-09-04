import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

const typeDefs = `
  type Message {
    content: String!
    createdAt: String!
    from: String!
    id: ID! @isUnique
  }

  type User {
    id: ID! @isUnique
    name: String! @isUnique
  }

  type Query {
    allMessages: [Message]
    allUsers: [User]
  }

  type Mutation {
    createUser(name: String!): User,
    createMessage(content: String!, from: String!): Message
    deleteUser(id: ID!): User
  }
`

const schema = makeExecutableSchema({ typeDefs })

addMockFunctionsToSchema({ schema })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema })
})

export default client
