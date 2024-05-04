import { Flex } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import logo from '/logo.png';

const Home = () => {
  return (
    <>
    <Link to='/search'>
    <Flex justify='center'>
    <img
      src={logo}
      alt='Fashion Collective Logo'
      style={{
        width: '80%',
        height: '80%',
      }}
    />
    </Flex>
    </Link>
    </>
  );
};

export default Home;