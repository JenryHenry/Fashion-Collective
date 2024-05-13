import { useEffect, useState, useRef } from 'react';
import { ADD_TO_CART } from '../utils/actions';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise, pickSuccessWord } from '../utils/helpers';

import { Button, Flex, Link } from '@radix-ui/themes';
import * as Toast from '@radix-ui/react-toast';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

const AddToCart = ({ product }) => {
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

    // Render option to add clothing item to cart
    return(
        <>
        {   
            <>
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
            <AddShoppingCartOutlinedIcon /> Add to Cart
            </Button>
            <Toast.Root className='ToastRoot' open={open} onOpenChange={setOpen}>
                <Flex direction='column'>
                <Toast.Title className='ToastTitle'>{pickSuccessWord()}</Toast.Title>
                <Toast.Description>
                    <Flex direction='column'>
                    Added {product.title} to cart.
                    <Link href='/cart' weight='medium'>Go to Cart</Link>
                    </Flex>
                </Toast.Description>
                </Flex>
            </Toast.Root>
            </>
        }
        </>
    );
}

export default AddToCart;