import { Box, TabNav } from '@radix-ui/themes';

const Navbar = () => {
  return (
    <Box>
        <TabNav.Root>
            <TabNav.Link href='/' active>Home</TabNav.Link>
            <TabNav.Link href='/search'>Search</TabNav.Link>
            {/* "My Outfits" link should only display if user is logged in */}
            <TabNav.Link href='/my-outfits'>My Outfits</TabNav.Link>
            <TabNav.Link href='/cart'>Cart</TabNav.Link> 
            {/* If user is logged in, should display "Logout" */}
            <TabNav.Link href='/login'>Login / Signup</TabNav.Link>
        </TabNav.Root>
    </Box>
  );
};

export default Navbar;