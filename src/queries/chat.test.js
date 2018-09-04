import apolloClientMock from 'test/apolloClientMock'
import { ALL_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION, SUBSCRIBE_TO_NEW_MESSAGES } from 'queries/chat'

describe('Message GraphQL queries test', () => {
  const fakeData = 'fakeData'

  it('Query all messages', async () => {
    const { data: { allMessages } } = await apolloClientMock.query({
      query: ALL_MESSAGES_QUERY
    })

    expect(allMessages.length).toBeGreaterThan(1)
  })

  it('Create a message', async () => {
    const { data: { createMessage } } = await apolloClientMock.mutate({
      mutation: CREATE_MESSAGE_MUTATION,
      variables: {
        content: fakeData,
        from: fakeData
      }
    })

    expect(createMessage).toHaveProperty('content')
    expect(createMessage).toHaveProperty('createdAt')
    expect(createMessage).toHaveProperty('from')
    expect(createMessage).toHaveProperty('id')
  })

  it('Subscribe to new messages', async () => {
    const { _subscriber } = await apolloClientMock.subscribe({
      query: SUBSCRIBE_TO_NEW_MESSAGES
    })

    expect(_subscriber).toBeTruthy()
  })
})
