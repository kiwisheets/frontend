import {
  ApolloClient, ApolloLink, InMemoryCache, from, HttpLink,
} from '@apollo/client';
// import { onError } from '@apollo/client/link/error';
import { createPersistedQueryLink } from '@apollo/link-persisted-queries';

import { IS_LOGGED_IN } from 'graphql/Queries';
import { resolvers, typeDefs } from './ApolloResolvers';
import localStorageKey from './LocalStorageKey';

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem(localStorageKey);
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
        'client-name': 'Kiwisheets [web]',
        'client-version': '0.0.1',
      },
    };
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: (process.env.REACT_APP_BASE_DOMAIN || '') + process.env.REACT_APP_API_URI,
  credentials: 'include',
});

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.map(({ message, locations, path }) => console.error(
//       `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//     ));
//   }

//   if (networkError) console.error(`[Network error]: ${networkError}`);
// });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    createPersistedQueryLink({
      // generateHash: ({ documentId }) => documentId,
      useGETForHashedQueries: true,
    }),
    // errorLink,
    authMiddleware,
    httpLink,
  ]),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
  resolvers,
  typeDefs,
  queryDeduplication: true,
});

const writeInitialData = () => {
  client.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: !!localStorage.getItem(localStorageKey),
    },
  });
};

writeInitialData();

console.log((process.env.REACT_APP_BASE_DOMAIN || '') + process.env.REACT_APP_API_URI);

client.onResetStore(writeInitialData);
client.onClearStore(writeInitialData);

export default client;
