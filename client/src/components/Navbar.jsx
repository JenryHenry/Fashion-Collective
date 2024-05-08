import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

import { Box, TabNav } from '@radix-ui/themes';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Navbar = () => {
  let pathname = window.location.pathname;
  let { state } = useLocation();

  // If user is logged in, navbar tabs are: Home, Search for Clothes, My Outfits, Cart, Logout
  if(Auth.loggedIn()){
    return (
      <Box>
        <TabNav.Root>
            <TabNav.Link asChild active={pathname === '/'}>
              <Link to='/' state='/'>
              <HomeOutlinedIcon />
                Home
              </Link>
            </TabNav.Link>
            <TabNav.Link asChild active={pathname === '/search'}>
              <Link to='/search' state='/search'>
                <SearchOutlinedIcon  />
                Search for Clothes
              </Link>
            </TabNav.Link>
            <TabNav.Link asChild active={pathname === '/my-outfits'}>
              <Link to='/my-outfits' state='/my-outfits'>
                <FavoriteBorderOutlinedIcon />
                My Outfits
              </Link>
            </TabNav.Link>
            <TabNav.Link asChild active={pathname === '/cart'}>
              <Link to='/cart' state='/cart'>
                <ShoppingCartOutlinedIcon />
                Cart
              </Link>
            </TabNav.Link> 
            <TabNav.Link onClick={Auth.logout}>
              <LogoutOutlinedIcon  />
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
                <Link to='/' state='/'>
                  <HomeOutlinedIcon />
                  Home
                </Link>
              </TabNav.Link>
              <TabNav.Link asChild active={pathname === '/search'}>
                <Link to='/search' state='/search'>
                  <SearchOutlinedIcon  />
                  Search for Clothes
                </Link>
              </TabNav.Link>
              <TabNav.Link asChild active={pathname === '/cart'}>
                <Link to='/cart' state='/cart'>
                  <ShoppingCartOutlinedIcon />
                  Cart
                </Link>
              </TabNav.Link> 
              <TabNav.Link asChild active={pathname === '/login'}>
                <Link to='/login' state='/login'>
                  <LoginOutlinedIcon />
                  Login / Signup
                </Link>
              </TabNav.Link>
          </TabNav.Root>
      </Box>
    )
};

export default Navbar;