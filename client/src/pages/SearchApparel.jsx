import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/queries';
import { ADD_TOP, ADD_ACCESSORIES } from '../utils/mutations';
import { CLEAR_QUERY, SET_QUERY, UPDATE_PRODUCTS } from '../utils/actions';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';

import Categories from '../components/Categories';
import Product from '../components/Product';

import { Box, Container, Grid, Heading, Text, TextField } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchApparel = () => {
    const [state, dispatch] = useStoreContext();

    const { searchQuery, currentCategory, products } = state;

    // useQuery hook
    // get all products from database
    const { loading, data: productData } = useQuery(GET_PRODUCTS);

    useEffect(() => {
        if (productData) {
          dispatch({
            type: UPDATE_PRODUCTS,
            products: productData.getProducts,
          });
          productData.getProducts.forEach((product) => {
            idbPromise('products', 'put', product);
          });
        } else if (!loading) {
          idbPromise('products', 'get').then((products) => {
            dispatch({
              type: UPDATE_PRODUCTS,
              products: products,
            });
          });
        }
      }, [productData, loading, dispatch]);

    const handleSubmit = async (event) => {
      event.preventDefault();
    }

    // update search input state
    const handleChange = (event) => {
        dispatch({
            type: SET_QUERY,
            searchQuery: event.target.value
        });
    };

    function filterProducts() {
      if (!currentCategory && !searchQuery) {
          return products;
      } 
  
      if (searchQuery) {
          return products.filter((product) => 
              product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
      }
      
      return products.filter(
          (product) => product.category._id === currentCategory
      );
    };

    useEffect(() => {
      dispatch({ type: CLEAR_QUERY});
    }, [currentCategory]);


    return (
        <>
        <Container pb='8' maxWidth='800px'>
            <Heading as='h2' align='center'>Search for Clothing</Heading>
            <Form.Root onSubmit={handleSubmit}>
                <Form.Field>
                    <TextField.Root
                    type='search'
                    pt='5'
                    size='3'
                    placeholder='Search'
                    name='product'
                    value={searchQuery}
                    onChange={handleChange}
                    >
                    <TextField.Slot>
                        <SearchOutlinedIcon />
                    </TextField.Slot>
                    </TextField.Root>
                </Form.Field>
            </Form.Root>
        </Container>
        <Categories />
        <Container maxWidth='90%'>
            <Grid columns={{ initial: '1', md: '3', lg:'4', xl:'5' }} gap='3' width='auto'>
                {filterProducts().map((product) => (
                <Product key={product._id} product={product}/>
                ))}
            </Grid>
        </Container>

        </>
    )

};

export default SearchApparel;