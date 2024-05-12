import React, {useCallback, useState, useEffect, useRef } from 'react';
import {useDropzone} from 'react-dropzone';
import { useLazyQuery } from '@apollo/client';
import { SET_QUERY, UPDATE_PRODUCTS } from '../utils/actions';
import { GET_PRODUCTS } from '../utils/queries';
import { colorSearch, tagSearch } from '../utils/API';
import { idbPromise } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState';

import { Button, Container, Card, Text, Box, Strong, Flex } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import * as Toast from '@radix-ui/react-toast';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

function ImageSearch() {

    const [state, dispatch] = useStoreContext();

    const [imageUrl, setImageUrl] = useState(null);

    // useState hook
    // holds the state of toast notification window
    const [open, setOpen] = useState(false);

    const timerRef = useRef(0);

    // useLazyQuery hook
    // getProducts must be called to get all products from database
    const [getProducts, { loading, data }] = useLazyQuery(GET_PRODUCTS);


    useEffect( () => {
        if (imageUrl){
            
            setOpen(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
                setOpen(true);
            }, 100);
        }
    },[imageUrl]);


    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
            setImageUrl(reader.result);
        }
        reader.readAsDataURL(file);
        });
        
    }, []);
    
    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const handleSearch = async (event) => {

        event.preventDefault();

        setImageUrl('');


        try{

            const color = await colorSearch(imageUrl);
            const tag = await tagSearch(imageUrl);

            const input = `${color} ${tag}`;

            // only products that match search query will be returned
            const response = await getProducts({ variables: { title: input } });

            // update global state of search query
            dispatch({ 
                type: SET_QUERY,
                searchQuery: input,
            });
            

            // update global state of products array
            dispatch({
                type: UPDATE_PRODUCTS,
                products: response.data.getProducts,
            });

            response.data.getProducts.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        }
        catch(err){
            console.error(err);
        }
    }

    return(
        <>
            <Form.Root onSubmit={handleSearch}>
                <Form.Field>
                    <Container width="35vw">
                        <Card>
                            <div {...getRootProps()}>
                                <input {...getInputProps()}  />
                                <Text as="p" size="3" align="center"><Strong>Search by Image</Strong></Text>
                                <Text as="p" size="3" align="center">Drag and Drop or Click to Upload an Image</Text>
                                <Box align="center">
                                    <AddAPhotoOutlinedIcon />
                                </Box>
                            </div>
                            <Box align="center">
                                { imageUrl ? console.log('Image Uplaoded!') : console.log('No Image!')}
                                <Button
                                    aria-label='Search by Image'
                                    name='search-image' 
                                    type='submit' 
                                    variant='solid'
                                    style={{ 
                                        height: 'auto', 
                                        }}
                                    >
                                    Search
                                </Button>
                            </Box>
                        </Card>
                    </Container>
                </Form.Field>
            </Form.Root>
            <Toast.Root className='ToastRoot' open={open} onOpenChange={setOpen}>
                    <Flex direction='column'>
                    <Toast.Title className='ToastTitle'>Success!</Toast.Title>
                    <Toast.Description>Image Uploaded</Toast.Description>
                    </Flex>
            </Toast.Root>
        </>                       
    );
}


export default ImageSearch;