import { useMutation } from '@apollo/client'; 
import { ADD_TOP, ADD_ACCESSORIES } from '../utils/mutations';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';

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