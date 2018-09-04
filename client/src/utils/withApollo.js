import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache, split } from 'apollo-boost'
import { getMainDefinition } from 'apollo-utilities'
import { WebSocketLink } from 'apollo-link-ws'
import fetch from 'unfetch'

const { SERVER_URL, SUBSCRIPTION_URL } = process.env

const wsLink = process.browser ? new WebSocketLink({
  options: {
    reconnect: true
  },
  uri: SUBSCRIPTION_URL
}) : null
const httpLink = new HttpLink({
  fetch: process.browser ? undefined : fetch,
  uri: SERVER_URL
})
const link = process.browser ? split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)

    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
) : httpLink

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

export default Component =>
  () =>
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
