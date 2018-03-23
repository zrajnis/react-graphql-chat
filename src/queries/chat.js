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
export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateChatMessage($content: String!, $from: String!) {
    createMessage(content: $content, from: $from) {
      id
      createdAt
      from
      content
    }
  }
`
