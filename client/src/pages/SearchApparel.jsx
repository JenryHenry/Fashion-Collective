import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/queries';
import { ADD_TOP, ADD_ACCESSORIES } from '../utils/mutations';

import Categories from '../components/Categories';
import Product from '../components/Product';

import { Box, Container, Grid, Heading, Text, TextField } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchApparel = () => {
    // useState hook
    // holds search field data
    const [search, setSearch] = useState('');
    // holds category products
    const [categoryProducts, setCategoryProducts] = useState('');

    // console.log(search)

    // useLazyQuery hook
    // getProducts must be called to get all products from database
    const [getProducts, { loading, data: productData }] = useLazyQuery(GET_PRODUCTS);

    // console.log(productData);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            // only products that match search input will be returned
            await getProducts({ variables: { title: search } });

        }
        catch(err){
            console.error(err);
        }
        
    }

    // update search input state
    const handleChange = (event) => {
        setSearch(event.target.value)
    };
  
//     const [addAccessories] = useMutation(ADD_ACCESSORIES);
//     const [addTop] = useMutation(ADD_TOP);

//     const handleAddTop = async () => {
//         const top = '663afcdf22e65882a09b3d6f';
//         const outfitName = 'outfit8';
//         try {
//             const { data } = await addTop({
//                 variables: { outfitName, top }
//             })
//         }


//         catch (err) {
//             console.log(err);
//         }
//     };

//     const handleAddAccessories = async () => {
//         const accessories = '663afcdf22e65882a09b3d7d';
//         const outfitName = 'outfit8';
//         try {
//             const { data } = await addAccessories({
//                 variables: { outfitName, accessories }
//             })
//         } catch (err) {
//             console.log(err);
//         }
//     };

    // Renders if no searches have been made or if no categories have been selected
    if(!productData && !categoryProducts){
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
            <Categories setCategoryProducts={setCategoryProducts} setSearch={setSearch}/>
            <Box as='div' align='center'>
                <Text>Please use the search bar to search for clothing item or click a clothing category above.</Text>
            </Box>
            </>
        )
    }

    // Render products when user searches keyword
    if(!loading && !categoryProducts){
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
            <Categories setCategoryProducts={setCategoryProducts} setSearch={setSearch}/>
            { productData ?
            <Container maxWidth='90%'>
                <Grid columns={{ initial: '1', md: '3', lg:'4', xl:'5' }} gap='3' width='auto'>
                    <Product productData={productData}/>
                </Grid>
            </Container>
            :
            <Box as='div' align='center'>
                {console.log(productData)}
                <Text>No clothes found! Please try a different search.</Text>
            </Box>
            }
            </>
        )
    }

    // Render products when a category is selected
    if(categoryProducts){

    }


        // Renders if search returns empty array
    //     return(
    //         <>
    //         <Container pb='8' maxWidth='800px'>
    //             <Heading as='h2' align='center'>Search for Clothing</Heading>
    //             <Form.Root onSubmit={handleSubmit}>
    //                 <Form.Field>
    //                     <TextField.Root
    //                     type='search'
    //                     pt='5'
    //                     size='3'
    //                     placeholder='Search'
    //                     name='product'
    //                     value={search}
    //                     onChange={handleChange}
    //                     >
    //                     <TextField.Slot>
    //                         <SearchOutlinedIcon />
    //                     </TextField.Slot>
    //                     </TextField.Root>
    //                 </Form.Field>
    //             </Form.Root>
    //         </Container>
    //         <Categories setCategoryProducts={setCategoryProducts}/>
    //         <Box as='div' align='center'>
    //             <Text>No clothes found! Please try a different search.</Text>
    //         </Box>
    //         </>
    //     );

    // // Renders if search returns empty array
    // if(!productData.getProducts.length){
    //     return(
    //         <>
    //         <Container pb='8' maxWidth='800px'>
    //             <Heading as='h2' align='center'>Search for Clothing</Heading>
    //             <Form.Root onSubmit={handleSubmit}>
    //                 <Form.Field>
    //                     <TextField.Root
    //                     type='search'
    //                     pt='5'
    //                     size='3'
    //                     placeholder='Search'
    //                     name='product'
    //                     value={search}
    //                     onChange={handleChange}
    //                     >
    //                     <TextField.Slot>
    //                         <SearchOutlinedIcon />
    //                     </TextField.Slot>
    //                     </TextField.Root>
    //                 </Form.Field>
    //             </Form.Root>
    //         </Container>
    //         <Categories setCategoryProducts={setCategoryProducts}/>
    //         <Box as='div' align='center'>
    //             <Text>No clothes found! Please try a different search.</Text>
    //         </Box>
    //         </>
    //     );
    // }

    // if(categoryProducts.getTypeProducts.length){
    //     <>
    //     <Container pb='8' maxWidth='800px'>
    //         <Heading as='h2' align='center'>Search for Clothing</Heading>
    //         <Form.Root onSubmit={handleSubmit}>
    //             <Form.Field>
    //                 <TextField.Root
    //                 type='search'
    //                 pt='5'
    //                 size='3'
    //                 placeholder='Search'
    //                 name='product'
    //                 value=''
    //                 onChange={handleChange}
    //                 >
    //                 <TextField.Slot>
    //                     <SearchOutlinedIcon />
    //                 </TextField.Slot>
    //                 </TextField.Root>
    //             </Form.Field>
    //         </Form.Root>
    //     </Container>
    //     <Categories setCategoryProducts={setCategoryProducts}/>
    //     <Container maxWidth='90%'>
    //         <Grid columns={{ initial: '1', md: '3', lg:'4', xl:'5' }} gap='3' width='auto'>
    //             <Product categoryData={categoryProducts}/>
    //         </Grid>
    //     </Container>
    //     </>
    // }

        // Renders products that user searched for
        // return (
        //     <>
        //     <Container pb='8' maxWidth='800px'>
        //         <Heading as='h2' align='center'>Search for Clothing</Heading>
        //         <Form.Root onSubmit={handleSubmit}>
        //             <Form.Field>
        //                 <TextField.Root
        //                 type='search'
        //                 pt='5'
        //                 size='3'
        //                 placeholder='Search'
        //                 name='product'
        //                 value={search}
        //                 onChange={handleChange}
        //                 >
        //                 <TextField.Slot>
        //                     <SearchOutlinedIcon />
        //                 </TextField.Slot>
        //                 </TextField.Root>
        //             </Form.Field>
        //         </Form.Root>
        //     </Container>
        //     <Categories setCategoryProducts={setCategoryProducts}/>
        //     <Container maxWidth='90%'>
        //         <Grid columns={{ initial: '1', md: '3', lg:'4', xl:'5' }} gap='3' width='auto'>
        //             <Product productData={productData}/>
        //         </Grid>
        //     </Container>
        //     {/* <div>
        //             <p>Search Apparel page here</p>
        //             <button onClick={handleAddTop}>Add Top</button>
        //             <button onClick={handleAddAccessories}>Add Watch</button>
        //     </div> */}
        //     </>
        // )
};

export default SearchApparel;