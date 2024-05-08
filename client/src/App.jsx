import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { StoreProvider } from './utils/GlobalState';

import { Box, Flex, Theme } from '@radix-ui/themes';
import Navbar from './components/Navbar';
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Theme radius='large'>
            <Navbar />
            <Box pt='5' pb='5'>
            <Flex asChild align='center' justify='center'>
              <Outlet />
            </Flex>
            </Box>
        </Theme>
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;