import apolloClientMock from 'test/apolloClientMock'
import { CREATE_USER_MUTATION, DELETE_USER_MUTATION } from 'queries/user'

describe('User GraphQL queries test', () => {
  const fakeData = 'fakeData'

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
})
