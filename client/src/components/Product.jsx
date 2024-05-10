import { Box, Button, Card, Inset, Text } from "@radix-ui/themes";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Product = ({ productData, categoryData }) => {

    console.log(productData);
    console.log(categoryData);

    if(productData){
        return (
            <>
            {productData.getProducts.map((product) => (
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
                        <Button>
                            <ShoppingCartOutlinedIcon /> Add to Cart
                        </Button>
                    </Box>
                </Card>
            </Box>
            ))}
            </>
        );
    }

    if(categoryData){
        return (
            <>
            {categoryData.getTypeProducts.map((product) => (
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
                        <Button>
                            <ShoppingCartOutlinedIcon /> Add to Cart
                        </Button>
                    </Box>
                </Card>
            </Box>
            ))}
            </>
        );
    }
};

export default Product;