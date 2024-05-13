import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

import { Box, Button, Card, Inset, Text } from "@radix-ui/themes";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

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
      idbPromise('cart', 'put', { ...product, purchaseQty: parseInt(value) });

    }
  }

  return (
  <>
    <Box key={product._id} maxWidth='350px'>
      <Card 
      variant='surface' 
      size='3' 
      style=
        {{
            background: 'rgb(247,247,247)',
            background: 'radial-gradient(circle, rgba(247,247,247,1) 80%, rgba(149,116,104,1) 87%)',
        }}>
        <Inset clip='border-box' side='top' pb='current'>
          <img
            src={'./images/' + product.image}
            alt={product.description}
            style={{
              display: 'block',
              objectFit: 'cover',
              width: '100%',
              height: '350px',
            }}
          />
        </Inset>
        <Text as='p' size='5' weight='bold'> {product.title}
        </Text>
        <Text as='p' size='3' color='gray'> {product.category.name}
        </Text>
        <Text as='p' size='3' color='gray'> ${product.price}
        </Text>
        <br/>
        <Text as='p' size='3' color='gray'> 
          Quantity: <input
            type="number"
            placeholder="1"
            value={product.purchaseQty}
            onChange={onChange}
          />
        </Text>
        <br/>
        <Box align='center'>
          <Button
          variant='surface'
          color='red'
          onClick={() => removeFromCart(product)}>
              <DeleteOutlineOutlinedIcon />
              Remove From Cart
          </Button>
        </Box>
      </Card>
    </Box>
  </>                  
  );
}

export default CartItem;
