import React from "react";
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./components/App";
import registerServiceWorker from './components/registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import {HashRouter } from 'react-router-dom';

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjh7wzvdg6mv30111p953jkbu',
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjh7wzvdg6mv30111p953jkbu' })

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  
  <ApolloProvider client={client}>
    <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('app')
);
registerServiceWorker();
