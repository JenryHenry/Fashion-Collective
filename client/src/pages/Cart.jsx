import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART } from '../utils/actions';
import Auth from '../utils/auth';
import CartItem from '../components/CartItem';

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
      sum += product.price * product.purchaseQuantity;
    });
    return sum.toFixed(2);
  }


  function submitCheckout() {
    getCheckout({
      variables: { 
        products: [...state.cart],
      },
    });
  }


  return (
    <>
      <Container pb='8' maxWidth='800px'>
        <Heading as='h2' align='center'>Shopping Cart</Heading>
      </Container>
      {state.cart.length ? (
        <div>
          {state.cart.map((product) => (
            <CartItem key={product._id} product={product} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(Log In to Checkout)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
         No items in cart!
        </h3>
      )}
    </>
  );
};

export default CartPage;
