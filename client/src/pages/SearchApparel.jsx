import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/queries';
import { ADD_TOP, ADD_ACCESSORIES } from '../utils/mutations';

import Categories from '../components/Categories';
import Product from '../components/Product';

import { Container, Grid, Heading, TextField } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchApparel = () => {
    // useQuery hook
    // get all products from database
    const { loading, data: productData } = useQuery(GET_PRODUCTS);

    // useState hook
    // holds search field data
    const [search, setSearch] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const results = productData.getProducts.filter((product) => 
                                                            product.title.toLowerCase().includes(search.toLowerCase()));
            console.log(results);
        }
        catch(err){
            console.error(err);
        }
        
    }

    // update search input state
    const handleChange = (event) => {
        setSearch(event.target.value)
    };
  

    // loading screen until product data is returned
    if(loading){
        return(
            <p>Please wait...</p>
        );
    }

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
                    value={search}
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
                <Product productData={productData}/>
            </Grid>
        </Container>

        </>
    )
};

export default SearchApparel;