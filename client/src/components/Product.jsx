import { ADD_TO_CART } from '../utils/actions';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';

import { Box, Button, Card, Inset, Text } from '@radix-ui/themes';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Product = () => {

    // Accessing state and dispatch from context
    const [state, dispatch] = useStoreContext();

    const handleAddToCart = (item) => {
        // Dispatch an action to add the product to the cart
        dispatch({ type: ADD_TO_CART, product: item });
        idbPromise('cart', 'put', { ...item });
    };

    // Render message to user if no categories have been selected or no search performed
    if(!state.products.length && !state.searchQuery){
        return(
            <>
            <Box as='div' align='center'>
                <Text>Please use the search bar to search for clothing item or click a clothing category above.</Text>
            </Box>
            </>
        );
    }

    // Render message to user if no clothing items were found
    if(!state.products.length && state.searchQuery)
    return(
        <Box as='div' align='center'>
            <Text>No items were found! Please try a different search.</Text>
        </Box>
    );

    // Render products
    if(state.products.length){
        return (
            <>
            {state.products.map((product) => (
            <Box key={product._id} maxWidth='350px'>
                <Card variant='surface' size='3'>
                    <Inset clip='border-box' side='top' pb='current'>
                    <img
                        src={'./images/' + product.image}
                        alt={product.description}
                        style={{
                        display: 'block',
                        objectFit: 'cover',
                        width: '100%',
                        height: 350,
                        }}
                    />
                    </Inset>
                    <Text as='p' size='5' weight='bold'> {product.title}
                    </Text>
                    <Text as='p' size='3' color='gray'> {product.category.name}
                    </Text>
                    <Text as='p' size='3' color='gray'> ${product.price}
                    </Text>
                    <Box align='center'>
                        <Button onClick={() => handleAddToCart(product)}>
                            <ShoppingCartOutlinedIcon /> Add to Cart
                        </Button>
                    </Box>
                </Card>
            </Box>
            ))}
            </>
        );
    }
};

export default Product;