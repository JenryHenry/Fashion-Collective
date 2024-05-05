import { Container, Flex } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import logo from '/logo.png';

const Home = () => {
  return (
      <Container size='4'>
        <Link to='/search'>
          <Flex justify='center'>
          <img
            src={logo}
            alt='Fashion Collective Logo'
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          </Flex>
        </Link>
      </Container>
  );
};

export default Home;