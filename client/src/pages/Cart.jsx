import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART } from '../utils/actions';
import Auth from '../utils/auth';
import CartItem from '../components/CartItem';
import { Box, Container, Heading, Text, Strong, Button, Flex } from '@radix-ui/themes';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); 

const CartPage = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);


  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);


  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);


  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((product) => {
      sum += product.price * product.purchaseQty;
    });
    return sum.toFixed(2);
  }


  function submitCheckout() {
    const products = [];
    for (const product of state.cart) {
      products.push({
        _id: product._id,
        purchaseQty: product.purchaseQty,
        title: product.title,
        image: product.image,
        price: product.price,
        count: product.count
      });
    }
    getCheckout({
      variables: { 
        products: products,
      },
    });
  }


  return (
    <>
      {state.cart.length ? (
        <>
        <Container pb='8' maxWidth='800px'>
        <Heading as='h2' align='center'>Shopping Cart</Heading>
          <Text as='p' size='5' align='center'><Strong>Total:</Strong> ${calculateTotal()}</Text>
          {Auth.loggedIn() ? (
            <Box align='center'>
              <Button onClick={submitCheckout} >Checkout</Button>
            </Box>
          ) : (
            <Text as='p' size='4' align='center'>Login to Checkout</Text>
          )}
        </Container>
        <Container maxWidth='90%'>
            <Flex gap='3' justify='center' width='auto' direction='row' wrap='wrap'>
              {state.cart.map((product) => (
              <CartItem key={product._id} product={product} />
              ))}
            </Flex>
        </Container>.
        </>
      ) : (
        <Container pb='3' maxWidth='90%'>
          <Heading as='h2' align='center'>Shopping Cart</Heading>
          <br/>
          <Text as='p' size='5' align='center'>No items in cart!</Text>
        </Container>
      )} 
    </>
  );
};

export default CartPage;
