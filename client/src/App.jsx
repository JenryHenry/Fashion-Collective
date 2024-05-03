import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import Navbar from './components/Navbar';

function App() {
  return (
         <Theme>
            <Navbar />
            <Outlet />
        </Theme>
  );
}

export default App;