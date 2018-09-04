const { PubSub } = require('graphql-subscriptions')

const NEW_MESSAGE_CREATED = 'NEW_MESSAGE_CREATED'
const db = {
  messages: [],
  users: []
}
const pubsub = new PubSub()
let nextUserId = 0

module.exports = {
  Mutation: {
    createMessage (root, { content, from }, context) {
      const newMessage = {
        content,
        from,
        id: db.messages.length
      }

      db.messages.push(newMessage)
      pubsub.publish(NEW_MESSAGE_CREATED, newMessage)

      return newMessage
    },
    createUser (root, { name }, context) {
      const newUser = {
        id: nextUserId,
        name
      }

      nextUserId++
      db.users.push(newUser)

      return newUser
    },
    deleteUser (root, { id }, context) {
      const targetUser = db.users.find(user => user.id === id)

      db.users.splice(db.users.indexOf(targetUser), 1)

      return targetUser
    }
  },
  Query: {
    allMessages (root, args = {}, context) {
      return db.messages
    },
    allUsers (root, args = {}, context) {
      return db.users
    }
  },
  Subscription: {
    newMessage: {
      resolve (payload, args, context, info) {
        return payload
      },
      subscribe () {
        return pubsub.asyncIterator(NEW_MESSAGE_CREATED)
      }
    }
  }
}
