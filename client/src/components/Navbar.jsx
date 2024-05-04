import { Box, TabNav } from '@radix-ui/themes';
import { Link, useLocation } from 'react-router-dom';

import AuthService from '../utils/auth';

const Navbar = () => {
  let pathname = window.location.pathname;
  let { state } = useLocation();

  // If user is logged in, navbar tabs are: Home, Search, My Outfits, Cart, Logout
  if(AuthService.loggedIn()){
    return (
      <Box>
          <TabNav.Root>
              <TabNav.Link asChild active={pathname === '/'}>
                <Link to='/' state='/'>Home</Link>
              </TabNav.Link>
              <TabNav.Link asChild active={pathname === '/search'}>
                <Link to='/search' state='/search'>Search</Link>
              </TabNav.Link>
              <TabNav.Link asChild active={pathname === '/my-outfits'}>
                <Link to='/my-outfits' state='/my-outfits'>My Outfits</Link>
              </TabNav.Link>
              <TabNav.Link asChild active={pathname === '/cart'}>
                <Link to='/cart' state='/cart'>Cart</Link>
              </TabNav.Link> 
              <TabNav.Link asChild active={pathname === '/logout'}>
                <Link to='/logout' state='/logout'>Logout</Link>
              </TabNav.Link>
          </TabNav.Root>
      </Box>
    )
  }

  // If user is logged in, navbar tabs are: Home, Search, Cart, Login / Signup
    return (
      <Box>
          <TabNav.Root>
              <TabNav.Link asChild active={pathname === '/'}>
                <Link to='/' state='/'>Home</Link>
              </TabNav.Link>
              <TabNav.Link asChild active={pathname === '/search'}>
                <Link to='/search' state='/search'>Search</Link>
              </TabNav.Link>
              <TabNav.Link asChild active={pathname === '/cart'}>
                <Link to='/cart' state='/cart'>Cart</Link>
              </TabNav.Link> 
              <TabNav.Link asChild active={pathname === '/login'}>
                <Link to='/login' state='/login'>Login / Signup</Link>
              </TabNav.Link>
          </TabNav.Root>
      </Box>
    )
};

export default Navbar;