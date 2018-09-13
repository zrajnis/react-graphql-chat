import apolloClientMock from 'test/apolloClientMock'
import { ALL_USERS_QUERY, CREATE_USER_MUTATION, DELETE_USER_MUTATION,
  SUBSCRIBE_TO_CREATED_USERS, SUBSCRIBE_TO_DELETED_USERS } from 'queries/user'

describe('User GraphQL queries test', () => {
  const fakeData = 'fakeData'

  it('Queries all users', async () => {
    const { data: { allUsers } } = await apolloClientMock.query({
      query: ALL_USERS_QUERY
    })

    expect(allUsers.length).toBeGreaterThan(1)
  })

  it('Creates a user', async () => {
    const { data: { createUser } } = await apolloClientMock.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: { name: fakeData }
    })

    expect(createUser).toHaveProperty('name')
    expect(createUser).toHaveProperty('id')
  })

  it('Deletes a user', async () => {
    const { data: { deleteUser } } = await apolloClientMock.mutate({
      mutation: DELETE_USER_MUTATION,
      variables: { id: fakeData }
    })

    expect(deleteUser).toHaveProperty('name')
    expect(deleteUser).toHaveProperty('id')
  })

  it('Subscribes to created users', async () => {
    const { _subscriber } = await apolloClientMock.subscribe({
      query: SUBSCRIBE_TO_CREATED_USERS
    })

    expect(_subscriber).toBeTruthy()
  })

  it('Subscribes to deleted users', async () => {
    const { _subscriber } = await apolloClientMock.subscribe({
      query: SUBSCRIBE_TO_DELETED_USERS
    })

    expect(_subscriber).toBeTruthy()
  })
})
