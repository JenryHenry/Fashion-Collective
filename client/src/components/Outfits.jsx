import { Box, Grid, Button, Card, Text, HoverCard, Popover, DataList } from '@radix-ui/themes';
import { useMutation } from '@apollo/client';
import { DELETE_TOP, DELETE_BOTTOM, DELETE_SHOES, DELETE_ACCESSORIES, DELETE_OUTFIT } from '../utils/mutations';
import { kbdPropDefs } from '@radix-ui/themes/props';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';
import { ADD_TO_CART } from '../utils/actions';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Outfits = ({ outfitData, setOutfitState }) => {

    const [deleteTop] = useMutation(DELETE_TOP);
    const [deleteBottom] = useMutation(DELETE_BOTTOM);
    const [deleteShoes] = useMutation(DELETE_SHOES);
    const [deleteAccessory] = useMutation(DELETE_ACCESSORIES);
    const [deleteOutfit] = useMutation(DELETE_OUTFIT);
    const [state, dispatch] = useStoreContext();

    const handleAddToCart = (item) => {
        // Dispatch an action to add the product to the cart
        console.log(item);
        dispatch({ type: ADD_TO_CART, product: {...item, purchaseQty: 1 }});
        idbPromise('cart', 'put', { ...item, purchaseQty: 1  });
    };

    const handleDeleteTop = async (outfit) => {
        try {
            const newData = await deleteTop({
                variables: {outfitName: outfit.outfitName, top: outfit.top._id}
            });
            setOutfitState(newData.data.deleteTop);
        } catch (err) {
            console.log(err)
        }
    };
    const handleDeleteBottom = async (outfit) => {
        try {
            const newData = await deleteBottom({
                variables: {outfitName: outfit.outfitName, bottom: outfit.bottom._id}
            });
            setOutfitState(newData.data.deleteBottom);
        } catch (err) {
            console.log(err)
        }
    };
    const handleDeleteShoes = async (outfit) => {
        try {
            const newData = await deleteShoes({
                variables: {outfitName: outfit.outfitName, shoes: outfit.shoes._id}
            });
            setOutfitState(newData.data.deleteShoes);
        } catch (err) {
            console.log(err)
        }
    };
    const handleDeleteAccessory = async (outfit) => {
        try {
            const newData = await deleteAccessory({
                variables: {outfitName: outfit.outfitName, accessories: outfit.accessory._id}
            });
            setOutfitState(newData.data.deleteAccessory);
        } catch (err) {
            console.log(err)
        }
    };
    const handleDeleteOutfit = async (outfit) => {
        try {
            const newData = await deleteOutfit({
                variables: {outfitName: outfit.outfitName}
            });
            setOutfitState(newData.data.deleteOutfit);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <>
        {outfitData.map((outfit) => (
                <Box key={outfit._id}>
                    <Card 
                    variant='surface' 
                    size='4' 
                    style=
                        {{
                            background: 'rgb(247,247,247)',
                            background: 'radial-gradient(circle, rgba(247,247,247,1) 80%, rgba(149,116,104,1) 87%)',
                        }}
                    >
                    <Text align='center' as='h1' weight='bold'>{outfit.outfitName[0].toUpperCase() + outfit.outfitName.slice(1)}</Text>
                    <Card>
                    {(() => {
                        if (outfit.top) {
                            return <>
                            <Box align='center'>
                            <img src={ './images/' + outfit.top.image} alt="outfit top" style={{
                                width: 150,
                                height: 150,
                            }}/>
                            <Box align='center'>
                            <Popover.Root>
                            <Popover.Trigger>
                            <Button variant='soft'>
                                <InfoOutlinedIcon />
                                Details
                            </Button>
                            </Popover.Trigger>
                            <Popover.Content>
                            <DataList.Root>
                                <DataList.Item>
                                <DataList.Value>{outfit.top.title}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>{outfit.top.description}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Text weight="medium">${outfit.top.price}</Text>
                                    </DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Button
                                    variant='soft'
                                    color='red'
                                    onClick={() => {handleDeleteTop(outfit)}}>
                                    <DeleteOutlineOutlinedIcon />
                                    Remove From Outfit
                                    </Button>
                                </DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Button
                                    variant='soft'
                                    color='green'
                                    onClick={() => handleAddToCart(outfit.top)}
                                    >
                                    <ShoppingCartOutlinedIcon />
                                    Add to Cart
                                    </Button>
                                </DataList.Value>
                                </DataList.Item>
                            </DataList.Root>
                            </Popover.Content>
                            </Popover.Root>
                            </Box>
                            </Box>
                            </>
                        }
                    }) ()}
                    {(() => {
                        if (outfit.bottom) {
                            return <>
                            <Box align='center'>
                            <img src={ './images/' + outfit.bottom.image} alt="outfit bottom" style={{
                                width: 150,
                                height: 150,
                            }}/>
                            <Box align='center'>
                            <Popover.Root>
                            <Popover.Trigger>
                            <Button variant='soft'>
                                <InfoOutlinedIcon />
                                Details
                            </Button>
                            </Popover.Trigger>
                            <Popover.Content>
                            <DataList.Root>
                                <DataList.Item>
                                <DataList.Value>{outfit.bottom.title}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>{outfit.bottom.description}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>${outfit.bottom.price}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Button 
                                    variant='soft'
                                    color='red'
                                    onClick={() => {handleDeleteBottom(outfit)}}>
                                    <DeleteOutlineOutlinedIcon />
                                    Remove From Outfit
                                    </Button>
                                </DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Button
                                    variant='soft'
                                    color='green'
                                    onClick={() => handleAddToCart(outfit.bottom)}
                                    >
                                    <ShoppingCartOutlinedIcon />
                                    Add to Cart
                                    </Button>
                                </DataList.Value>
                                </DataList.Item>
                            </DataList.Root>
                            </Popover.Content>
                            </Popover.Root>
                            </Box>
                            </Box>
                            </>
                        }
                    }) ()}
                    {(() => {
                        if (outfit.shoes) {
                            return <>
                            <Box align='center'>
                            <img src={ './images/' + outfit.shoes.image} alt="outfit shoes" style={{
                                width: 150,
                                height: 150,
                            }}/>
                            <Box align='center'>
                            <Popover.Root>
                            <Popover.Trigger>
                            <Button variant='soft'>
                                <InfoOutlinedIcon />
                                Details
                            </Button>
                            </Popover.Trigger>
                            <Popover.Content>
                            <DataList.Root>
                                <DataList.Item>
                                <DataList.Value>{outfit.shoes.title}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>{outfit.shoes.description}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>${outfit.shoes.price}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Button
                                    variant='soft'
                                    color='red'
                                    onClick={() => {handleDeleteShoes(outfit)}}>
                                    <DeleteOutlineOutlinedIcon />
                                    Remove From Outfit
                                    </Button>
                                </DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Button
                                    variant='soft'
                                    color='green'
                                    onClick={() => handleAddToCart(outfit.shoes)}
                                    >
                                    <ShoppingCartOutlinedIcon />
                                    Add to Cart
                                    </Button>
                                </DataList.Value>
                                </DataList.Item>
                            </DataList.Root>
                            </Popover.Content>
                            </Popover.Root>
                            </Box>
                            </Box>
                            </>
                        }
                    }) ()}
                        {(() => {
                        if (outfit.accessories[0]) {
                            return <>
                            <Box align='center'>
                            <img src={ './images/' + outfit.accessories[0].image} alt="outfit accessory 1" style={{
                                width: 150,
                                height: 150,
                            }}/>
                            <Box align='center'>
                            <Popover.Root>
                            <Popover.Trigger>
                            <Button variant='soft'>
                                <InfoOutlinedIcon />
                                Details
                            </Button>
                            </Popover.Trigger>
                            <Popover.Content>
                            <DataList.Root>
                                <DataList.Item>
                                <DataList.Value>{outfit.accessories[0].title}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>{outfit.accessories[0].description}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>${outfit.accessories[0].price}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Button 
                                    variant='soft'
                                    color='red'
                                    onClick={() => {handleDeleteTop(outfit)}}>
                                    <DeleteOutlineOutlinedIcon />
                                    Remove From Outfit
                                    </Button>
                                </DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Button
                                    variant='soft'
                                    color='green'
                                    onClick={() => handleAddToCart(outfit.accessories[0])}
                                    >
                                    <ShoppingCartOutlinedIcon />
                                    Add to Cart
                                    </Button>
                                </DataList.Value>
                                </DataList.Item>
                            </DataList.Root>
                            </Popover.Content>
                            </Popover.Root>
                            </Box>
                            </Box>
                            </>
                        }
                    }) ()}
                    {(() => {
                        if (outfit.accessories[1]) {
                            return <>
                            <Box align='center'>
                            <img src={ './images/' + outfit.accessories[1].image} alt="outfit accessory 2" style={{
                                width: 150,
                                height: 150,
                            }}/>
                            <Box align='center'>
                            <Popover.Root>
                            <Popover.Trigger>
                            <Button variant='soft'>
                                <InfoOutlinedIcon />
                                Details
                            </Button>
                            </Popover.Trigger>
                            <Popover.Content>
                            <DataList.Root>
                                <DataList.Item>
                                <DataList.Value>{outfit.accessories[1].title}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>{outfit.accessories[1].description}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>${outfit.accessories[1].price}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Button
                                    variant='soft'
                                    color='red'
                                    onClick={() => {handleDeleteTop(outfit)}}>
                                    <DeleteOutlineOutlinedIcon />
                                    Remove From Outfit
                                    </Button>
                                </DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Button
                                    variant='soft'
                                    color='green'
                                    onClick={() => handleAddToCart(outfit.accessories[1])}
                                    >
                                    <ShoppingCartOutlinedIcon />
                                    Add to Cart
                                    </Button>
                                </DataList.Value>
                                </DataList.Item>
                            </DataList.Root>
                            </Popover.Content>
                            </Popover.Root>
                            </Box>
                            </Box>
                            </>
                        }
                    }) ()}
                    {(() => {
                        if (outfit.accessories[2]) {
                            return <>
                            <Box align='center'>
                            <img src={ './images/' + outfit.accessories[2].image} alt="outfit accessory 3" style={{
                                width: 150,
                                height: 150,
                            }}/>
                            <Box align='center'>
                            <Popover.Root>
                            <Popover.Trigger>
                            <Button variant='soft'>
                                <InfoOutlinedIcon />
                                Details
                            </Button>
                            </Popover.Trigger>
                            <Popover.Content>
                            <DataList.Root>
                                <DataList.Item>
                                <DataList.Value>{accessories[2].title}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>{accessories[2].description}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value weight="medium">${accessories[2].price}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Button
                                    variant='soft'
                                    color='red'
                                    onClick={() => {handleDeleteTop(outfit)}}>
                                    <DeleteOutlineOutlinedIcon />
                                    Remove From Outfit
                                    </Button>
                                </DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                <DataList.Value>
                                    <Button
                                    variant='soft'
                                    color='green'
                                     onClick={() => handleAddToCart(outfit.accessories[2])}
                                    >
                                    <ShoppingCartOutlinedIcon />
                                    Add to Cart
                                    </Button>
                                </DataList.Value>
                                </DataList.Item>
                            </DataList.Root>
                            </Popover.Content>
                            </Popover.Root>
                            </Box>
                            </Box>
                            </>
                        }
                    }) ()}
                    </Card>
                    <Box pt="5" align="center">
                    <Button
                    color='red'
                    variant='surface'
                    onClick={() => {handleDeleteOutfit(outfit)}}>
                        <DeleteOutlineOutlinedIcon />
                        Delete Outfit
                    </Button>
                    </Box>
                    </Card>
                </Box>
        ))}
        </>
    )
}

export default Outfits;