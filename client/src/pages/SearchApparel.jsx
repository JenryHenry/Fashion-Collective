import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import Product from '../components/Product';

import { Container, Flex } from '@radix-ui/themes';

const SearchApparel = () => {
  return(
      <>
        <SearchBar />
        <Categories />
        <Container maxWidth='90%'>
          <Flex gap='3' justify='center' width='auto' direction='row' wrap='wrap'>
          <Product />
          </Flex>
        </Container>
      </>
  );
};

export default SearchApparel;