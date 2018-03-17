import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import React from 'react'
import {Provider} from 'react-redux'

import store from 'store'
import Chat from 'containers/App/Chat'

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjebgvb1b31q90166j61wwlp7',
  options: {
    reconnect: true,
  },
})
const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjebgvb1b31q90166j61wwlp7',
})
const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default () =>
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Chat />
    </Provider>
  </ApolloProvider>
