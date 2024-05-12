import { useStoreContext } from '../utils/GlobalState';

import AddToCart from './AddToCart';
import AddToOutfit from './AddToOutfit';

import { Flex } from '@radix-ui/themes';

const ProductOptions = ({ product }) => {
    // Accessing state and dispatch from context
    const [state, dispatch] = useStoreContext();

    // Render product options to add clothing item to outfit or cart
    // If user is logged in, then the add to outfit button will appear
    return(
        <>
        {   
            <Flex key={product._id} gap='5' justify='center' wrap='wrap' pt='3'>
                <AddToOutfit product={product} />
                <AddToCart product={product} />
            </Flex>
        }
        </>
    );
}

export default ProductOptions;