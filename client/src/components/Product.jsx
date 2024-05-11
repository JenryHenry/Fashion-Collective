import { ADD_TO_CART } from '../utils/actions';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';

import ProductOptions from './ProductOptions';

import { Box, Card, Inset, Text } from '@radix-ui/themes';

const Product = () => {

    // Accessing state and dispatch from context
    const [state, dispatch] = useStoreContext();

    const handleAddToCart = (item) => {
        // Dispatch an action to add the product to the cart
        dispatch({ type: ADD_TO_CART, product: item });
        idbPromise('cart', 'put', { ...item });
    };

    // Render message to user if no categories have been selected or no search peformed (upon inital page load)
    if(!state.products.length && !state.searchQuery){
        return(
            <Box as='div' align='center'>
                <Text>Please use the search bar to search for clothing item or click a clothing category above.</Text>
            </Box>
        );
    }

    // Render message to use if no products were found
    if(!state.products.length && (state.searchQuery || state.currentCategory)){
        return(
            <Box as='div' align='center'>
                <Text>No clothes found! Please try a different search.</Text>
            </Box>
        );
    }

    // Default - render products
    return(
        <>
        {
            state.products.map((product) =>
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
                        <ProductOptions />
                    </Card>
                </Box>
            )
        }
        </>
    );
};

export default Product;