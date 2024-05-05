import { Box, TabNav } from '@radix-ui/themes';
import { Link, useLocation } from 'react-router-dom';

import Auth from '../utils/auth';

const Navbar = () => {
  let pathname = window.location.pathname;
  let { state } = useLocation();

  // If user is logged in, navbar tabs are: Home, Search for Clothes, My Outfits, Cart, Logout
  if(Auth.loggedIn()){
    return (
      <Box>
          <TabNav.Root>
              <TabNav.Link asChild active={pathname === '/'}>
                <Link to='/' state='/'>Home</Link>
              </TabNav.Link>
              <TabNav.Link asChild active={pathname === '/search'}>
                <Link to='/search' state='/search'>Search for Clothes</Link>
              </TabNav.Link>
              <TabNav.Link asChild active={pathname === '/my-outfits'}>
                <Link to='/my-outfits' state='/my-outfits'>My Outfits</Link>
              </TabNav.Link>
              <TabNav.Link asChild active={pathname === '/cart'}>
                <Link to='/cart' state='/cart'>Cart</Link>
              </TabNav.Link> 
              <TabNav.Link onClick={Auth.logout}>
                Logout
              </TabNav.Link>
          </TabNav.Root>
      </Box>
    )
  }

  // If no user is logged in, navbar tabs are: Home, Search for Clothes, Cart, Login / Signup
    return (
      <Box>
          <TabNav.Root>
              <TabNav.Link asChild active={pathname === '/'}>
                <Link to='/' state='/'>Home</Link>
              </TabNav.Link>
              <TabNav.Link asChild active={pathname === '/search'}>
                <Link to='/search' state='/search'>Search for Clothes</Link>
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