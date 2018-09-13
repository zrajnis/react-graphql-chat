module.exports = `
  type Message {
    content: String!
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
    createMessage(content: String!, from: String!): Message
    createUser(name: String!): User
    deleteUser(id: ID!): User
  }

  type Subscription {
    createdMessage: Message
    createdUser: User
    deletedUser: User
  }
`
