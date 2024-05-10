import { Box, Button, Card, Inset, Text } from "@radix-ui/themes";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART } from "../utils/actions";

const Product = ({ product }) => {

    const [state, dispatch] = useStoreContext(); // Accessing state and dispatch from context

    const handleAddToCart = (item) => {
        // Dispatch an action to add the product to the cart
        dispatch({ type: ADD_TO_CART, product: item });
    };
    
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
                    <Button onClick={handleAddToCart(product)}>
                        <ShoppingCartOutlinedIcon /> Add to Cart
                    </Button>
                </Box>
            </Card>
        </Box>
        </>
    );
};

export default Product;