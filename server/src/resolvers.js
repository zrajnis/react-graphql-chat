const { PubSub } = require('graphql-subscriptions')
const { MESSAGE_CREATED, USER_CREATED, USER_DELETED } = require('const')

const db = {
  messages: [],
  users: []
}
const pubsub = new PubSub()
let nextUserId = 0

module.exports = {
  Mutation: {
    createMessage (root, { content, from }, context) {
      const createdMessage = {
        content,
        from,
        id: String(db.messages.length)
      }

      db.messages = [
        ...db.messages,
        createdMessage
      ]
      pubsub.publish(MESSAGE_CREATED, createdMessage)

      return createdMessage
    },
    createUser (root, { name }, context) {
      const userExists = db.users.find(user => user.name === name)

      if (userExists) {
        throw new Error('Username taken')
      }

      const createdUser = {
        id: String(nextUserId),
        name
      }

      nextUserId++
      db.users = [
        ...db.users,
        createdUser
      ]
      pubsub.publish(USER_CREATED, createdUser)

      return createdUser
    },
    deleteUser (root, { id }, context) {
      const deletedUser = db.users.find(user => user.id === id)

      db.users = [
        ...db.users.filter(user => user.id !== id)
      ]
      pubsub.publish(USER_DELETED, deletedUser)

      return deletedUser
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
    createdMessage: {
      resolve (payload, args, context, info) {
        return payload
      },
      subscribe () {
        return pubsub.asyncIterator(MESSAGE_CREATED)
      }
    },
    createdUser: {
      resolve (payload, args, context, info) {
        return payload
      },
      subscribe () {
        return pubsub.asyncIterator(USER_CREATED)
      }
    },
    deletedUser: {
      resolve (payload, args, context, info) {
        return payload
      },
      subscribe () {
        return pubsub.asyncIterator(USER_DELETED)
      }
    }
  }
}
