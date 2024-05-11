import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

import { Box, Button, Card, Inset, Text } from "@radix-ui/themes";

const CartItem = ({ product }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = product => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: product._id
    });
    idbPromise('cart', 'delete', { ...product });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: product._id
      });
      idbPromise('cart', 'delete', { ...product });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: product._id,
        purchaseQty: parseInt(value)
      });
      idbPromise('cart', 'put', { ...product, purchaseQuantity: parseInt(value) });

    }
  }
  console.log(product);
  return (
  <>
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
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={product.purchaseQty}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(product)}
          >
            🗑️
          </span>
        </Box>
      </Card>
    </Box>
  </>                  
  );
}

export default CartItem;
