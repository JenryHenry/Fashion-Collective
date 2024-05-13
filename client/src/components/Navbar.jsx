import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

import { TabNav, Text } from '@radix-ui/themes';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Navbar = () => {
  let pathname = window.location.pathname;
  let { state } = useLocation();

  return(
      <TabNav.Root>
        {/* All users have access to Home, Search for Clothes, and Cart pages */}
        <TabNav.Link asChild active={pathname === '/'}>
          <Link to='/' state='/'>
          <HomeOutlinedIcon />
            <Text weight='bold'>Home</Text>
          </Link>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === '/search'}>
          <Link to='/search' state='/search' weight='bold'>
            <SearchOutlinedIcon  />
            <Text weight='bold'>Search</Text>
          </Link>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === '/cart'}>
            <Link to='/cart' state='/cart' weight='bold'>
              <ShoppingCartOutlinedIcon />
              <Text weight='bold'>Cart</Text>
            </Link>
          </TabNav.Link>
        {
          // Only authenticated users have access to My Outfits page and Logout
          Auth.loggedIn() ?
          <>
          <TabNav.Link asChild active={pathname === '/my-outfits'}>
            <Link to='/my-outfits' state='/my-outfits' weight='bold'>
              <FavoriteBorderOutlinedIcon />
              <Text weight='bold'>My Outfits</Text>
            </Link>
          </TabNav.Link> 
          <TabNav.Link onClick={Auth.logout}>
            <LogoutOutlinedIcon  />
            <Text weight='bold'>Logout</Text>
          </TabNav.Link>
          </>
          :
          // Unauthenticated users have access to login and signup pages
          <> 
          <TabNav.Link asChild active={pathname === '/login'}>
            <Link to='/login' state='/login' weight='bold'>
              <LoginOutlinedIcon />
              <Text weight='bold'>Login / Signup</Text>
            </Link>
          </TabNav.Link>
          </>
        }
        </TabNav.Root>
  );
}

export default Navbar;