import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SET_QUERY, UPDATE_PRODUCTS } from '../utils/actions';
import { GET_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState';

import ImageSearch from './ImageSearch';

import { Button, Container, Heading, TextField } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchBar = () => {
    const [state, dispatch] = useStoreContext();

    // get the featured item the user clicked on from the homepage
    const featuredItem = sessionStorage.getItem('featuredItem');

    // useState hook
    // this will hold any changes to the search input before the form is submmited
    // it's inital state will be an empty string or the featured item from session storage
    // helps prevent excessive dispatches and rerendering
    const [input, setInput] = useState(featuredItem || '');

    // useEffect hook
    // if there is a featured item, this will automatically click
    // the search button and remove the item from session storage
    useEffect(() => {
        clickSearchButton();
        sessionStorage.removeItem('featuredItem');
    }, [featuredItem]);

    // useLazyQuery hook
    // getProducts must be called to get all products from database
    const [getProducts, { loading, data }] = useLazyQuery(GET_PRODUCTS);

    // clickSearchButton function
    const clickSearchButton = () => {
        document.getElementById('searchButton').click();
    }

    // handleChange method
    // update search input state
    const handleChange = async (event) => {
        setInput(event.target.value);
    };

    // handleSubmit method
    // calls the getProducts query upon search form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
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
        <Container 
        pb='8'
        pr='4'
        pl='4' 
        size=
            {{
                initial: '1',
                xs: '2',
                lg: '3',
            }}
        >
            <Heading 
            as='h2' 
            align='center' 
            className='cursive' 
            style=
            {{ 
                paddingBottom: 'var(--space-6)',
                fontSize: '2.5rem'
            }}
            >
            Search for Clothing
            </Heading>
            <Form.Root onSubmit={handleSubmit} style={{ paddingBottom: 'var(--space-2)' }}>
                <Form.Field>
                    <TextField.Root
                    type='search'
                    pt='5'
                    size='3'
                    placeholder='Search'
                    name='product'
                    value={input}
                    onChange={handleChange}
                    required
                    >
                    <TextField.Slot aria-label='Search Icon'>
                        <SearchOutlinedIcon />
                    </TextField.Slot>
                    <Button
                    id='searchButton'
                    aria-label='Search for Clothes'
                    name='search' 
                    type='submit' 
                    variant='solid'
                    style={{ 
                        height: 'auto', 
                        borderTopLeftRadius:0, 
                        borderBottomLeftRadius:0
                        }}
                    >
                    Search
                    </Button>
                    </TextField.Root>
                </Form.Field>
            </Form.Root>
            <ImageSearch />
        </Container>
    );
};

export default SearchBar;