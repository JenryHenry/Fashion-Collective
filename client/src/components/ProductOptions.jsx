import { useEffect, useState, useRef } from 'react';
import { ADD_TO_CART } from '../utils/actions';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';

import { Button, Flex } from '@radix-ui/themes';
import * as Toast from '@radix-ui/react-toast';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const ProductOptions = ({ product }) => {
    // Accessing state and dispatch from context
    const [state, dispatch] = useStoreContext();

    // useRef hook
    // references the toast notification timer
    // timerRef does not trigger rerendering
    const timerRef = useRef(0);

    // useState hook
    // holds the state of toast notification window
    const [open, setOpen] = useState(false);

    // useEffect hook
    // reset clearTimeout method for toast notification
    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    // handleAddToCart method
    // Dispatch an action to add the product to the cart
    const handleAddToCart = (item) => {
        dispatch({ type: ADD_TO_CART, product: {...item, purchaseQty: 1 }});
        idbPromise('cart', 'put', { ...item, purchaseQty: 1  });
    };

    // pickSuccessWord function
    // Picks a random successful word to notify user of successful action
    const pickSuccessWord = () => {
        // Array of words for success
        const successWords = [
            'Horray!',
            'Hurrah!',
            'Whoopee!',
            'Woo-hoo!',
            'Woot woot!',
            'Yaaas!',
            'Yahoo!',
            'Yay!',
            'Yes!',
            'Yippee!',
        ];

        // Pick a random word from array
        let successWord = successWords[(Math.floor(Math.random() * successWords.length))];

        return successWord;
    }

    // Render product options to add clothing item to outfit or cart
    return(
        <>
        {   
            <Flex key={product._id} gap='5' justify='center' wrap='wrap' pt='3'>
                <Button 
                    type='button' 
                    aria-label='Add Item to an Outfit' 
                    name='addToOutfit'
                >
                <AddOutlinedIcon /> Add to Outfit
                </Button>
                <Button 
                    type='button' 
                    aria-label='Add One Item to Cart' 
                    name='addToCart' 
                    onClick={() => {
                        handleAddToCart(product);
                        setOpen(false);
                        window.clearTimeout(timerRef.current);
                        timerRef.current = window.setTimeout(() => {
                            setOpen(true);
                        }, 100);
                    }}
                >
                <ShoppingCartOutlinedIcon /> Add to Cart
                </Button>
                <Toast.Root className='ToastRoot' open={open} onOpenChange={setOpen}>
                    <Flex direction='column'>
                    <Toast.Title className='ToastTitle'>{pickSuccessWord()}</Toast.Title>
                    <Toast.Description>Added {product.title} to cart.</Toast.Description>
                    </Flex>
                </Toast.Root>
            </Flex>
        }
        </>
    );
}

export default ProductOptions;