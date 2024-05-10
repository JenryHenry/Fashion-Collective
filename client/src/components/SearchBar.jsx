import { useLazyQuery } from '@apollo/client';
import { SET_QUERY, UPDATE_PRODUCTS } from '../utils/actions';
import { GET_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState';

import { Container, Heading, TextField } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

// SearchBar needs to utilize global state for current category so when you search for a keyword, it sets the current category to empty
const SearchBar = () => {
    const [state, dispatch] = useStoreContext();

    const { searchQuery } = state;

    // useLazyQuery hook
    // getProducts must be called to get all products from database
    const [getProducts, { loading, data }] = useLazyQuery(GET_PRODUCTS);

    // handleChange method
    // update search input state
    const handleChange = async (event) => {
        dispatch({ 
            type: SET_QUERY,
            searchQuery: event.target.value,
        });
    };

    // handleSubmit method
    // calls the getProducts query upon search form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            // only products that match search query will be returned
            const response = await getProducts({ variables: { title: searchQuery } });

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

    return (
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
    )
};

export default SearchBar;