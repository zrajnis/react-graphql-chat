import { gql } from 'apollo-boost'

export const ALL_MESSAGES_QUERY = gql`
  query AllMessagesQuery {
    allMessages {
      content
      from
      id
    }
  }
`

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateChatMessage($content: String!, $from: String!) {
    createMessage(content: $content, from: $from) {
      content
      from
      id
    }
  }
`

export const SUBSCRIBE_TO_CREATED_MESSAGES = gql`
  subscription CreatedMessagesSubscription {
    createdMessage {
      content
      from
      id
    }
  }
`
