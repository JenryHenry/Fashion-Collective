import { Container, Heading, Flex, Link } from '@radix-ui/themes';
import FeaturedItemsCarousel from '../components/FeaturedItemsCarousel';

import logo from '/logo.png';

const Home = () => {
  return (
    <>
      {/* Graphic to welcome user to website */}
      <Flex justify='center'>
          <img
            src={logo}
            alt='Fashion Collective Logo'
            style={{
              paddingBottom: 'var(--space-6)',
              maxWidth: '100%',
            }}
          />
      </Flex>
      <Container>
        <Link href='/search'>
          <Heading 
          as='h2' 
          className='hover-cursive' 
          align='center'
          style={{
            fontSize: '2rem',
            paddingBottom: 'var(--space-6)',
          }}
          >
          Browse Collection
          </Heading>
        </Link>
      </Container>
      {/* Carousel to show featured clothing items */}
      <Container>
        <Heading 
        as='h2' 
        className='cursive' 
        align='center' 
        style=
        {{ 
          paddingBottom: 'var(--space-6)',
          fontSize: '2.5rem'
        }}
        >
        Featured Items:
        </Heading>
        <FeaturedItemsCarousel />
      </Container>
    </>
  );
};

export default Home;