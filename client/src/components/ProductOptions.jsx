import { ADD_TO_CART } from '../utils/actions';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';

import { Flex, Button } from '@radix-ui/themes';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const ProductOptions = () => {
    // Accessing state and dispatch from context
    const [state, dispatch] = useStoreContext();

    const handleAddToCart = (item) => {
        // Dispatch an action to add the product to the cart
        dispatch({ type: ADD_TO_CART, product: item });
        idbPromise('cart', 'put', { ...item });
    };

    return(
        <Flex gap='5' justify='center' wrap='wrap'>
        <Button>
            <AddOutlinedIcon /> Add to Outfit
        </Button>
        <Button onClick={() => handleAddToCart(product)}>
            <ShoppingCartOutlinedIcon /> Add to Cart
        </Button>
        </Flex>
    );
}

export default ProductOptions;