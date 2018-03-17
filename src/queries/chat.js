import gql from 'graphql-tag'

export const ALL_MESSAGES_QUERY = gql`
  query AllMessagesQuery {
    allMessages {
      id
      createdAt
      from
      content
    }
  }
`
