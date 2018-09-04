import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { getMainDefinition } from 'apollo-utilities'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import fetch from 'unfetch'

const wsLink = process.browser ? new WebSocketLink({
  options: {
    reconnect: true
  },
  uri: 'wss://subscriptions.graph.cool/v1/cjlmuwvso0izh0112alpa7uj9'
}) : null
const httpLink = new HttpLink({
  fetch: process.browser ? undefined : fetch,
  uri: 'https://api.graph.cool/simple/v1/cjlmuwvso0izh0112alpa7uj9'
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
