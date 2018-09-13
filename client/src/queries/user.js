import { gql } from 'apollo-boost'

export const ALL_USERS_QUERY = gql`
  query AllUSersQuery {
    allUsers {
      id
      name
    }
  }
`

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`

export const SUBSCRIBE_TO_CREATED_USERS = gql`
  subscription CreatedUsersSubscription {
    createdUser {
      id
      name
    }
  }
`

export const SUBSCRIBE_TO_DELETED_USERS = gql`
  subscription DeletedUsersSubscription {
    deletedUser {
      id
      name
    }
  }
`
