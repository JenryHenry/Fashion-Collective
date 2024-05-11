import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/queries';
import { ADD_TOP, ADD_ACCESSORIES, ADD_OUTFIT } from '../utils/mutations';

import Categories from '../components/Categories';
import Product from '../components/Product';

import { Container, Grid, Heading, TextField } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchApparel = () => {
    // useQuery hook
    // get all products from database
    const { loading, data: productData } = useQuery(GET_PRODUCTS);
    const [addOutfit] = useMutation(ADD_OUTFIT);

    // useState hook
    // holds search field data
    const [search, setSearch] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const results = productData.getProducts.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
            console.log(results);
            console.log(productData)
        }
        catch(err){
            console.error(err);
        }
        
    }

    // update search input state
    const handleChange = (event) => {
        setSearch(event.target.value)
    };
  
    const [addAccessories] = useMutation(ADD_ACCESSORIES);
//     const [addTop] = useMutation(ADD_TOP);

    const handleAddTop = async () => {
        const top = '663afcdf22e65882a09b3d6f';
        const outfitName = 'outfit8';
        try {
            const { data } = await addTop({
                variables: { outfitName, top }
            })
        }


        catch (err) {
            console.log(err);
        }
    };

    const handleAddOutfit = async () => {
        const outfitName = 'outfit9'

        try {
            await addOutfit({
                variables: outfitName ,
            });
        } catch (err) {
            console.log(err);
        }
    };


    const handleAddAccessories = async () => {
        const accessories = '663afcdf22e65882a09b3d7d';
        const outfitName = 'outfit1';
        try {
            const { data } = await addAccessories({
                variables: { outfitName, accessories }
            })
        } catch (err) {
            console.log(err);
        }
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
         <div>
                <p>Search Apparel page here</p>
                <button onClick={handleAddTop}>Add Top</button>
                 <button onClick={handleAddAccessories}>Add Watch</button>
                 <button onClick={handleAddOutfit}>Add Outfit</button>
         </div>
        </>
    )
};

export default SearchApparel;