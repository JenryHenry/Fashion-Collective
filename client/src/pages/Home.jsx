import { Link } from 'react-router-dom';

import { Container, Heading } from '@radix-ui/themes';
import Carousel from '../components/Carousel';

import logo from '/logo.png';

const Home = () => {
  return (
    <>
      {/* Graphic to welcome user to website */}
      <Link to='/search'>
        <img
          src={logo}
          alt='Fashion Collective Logo'
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Link>
      {/* Carousel to show featured clothing items */}
      <Container>
        <Heading as='h2' align='center'>Featured Items:</Heading>
        <Carousel />
      </Container>
    </>
  );
};

export default Home;