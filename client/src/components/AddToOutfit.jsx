import { useEffect, useRef, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_OUTFITS } from '../utils/queries';
import { ADD_TOP, ADD_BOTTOM, ADD_SHOES, ADD_ACCESSORIES, ADD_OUTFIT } from '../utils/mutations';
import { useStoreContext } from '../utils/GlobalState';

import Auth from '../utils/auth';

import { AlertDialog, Button, DropdownMenu, Flex, Link, Text, TextField, Popover } from '@radix-ui/themes';
import * as Toast from '@radix-ui/react-toast';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const AddToOutfit = ({ product }) => {
    // Accessing state and dispatch from context
    const [state, dispatch] = useStoreContext();

    // useState hook
    // holds all user outfits
    const [outfits, setOutfits] = useState([]);
    // holds outfit name
    const [outfitName, setOutfitName] = useState('');
    // holds the state of toast notification window for new outfits
    const [openNew, setOpenNew] = useState(false);
    // holds the state of toast notification window for existing outfits
    const [openExisting, setOpenExisting] = useState(false);

    // useRef hook
    // references the toast notification timer
    // timerRef does not trigger rerendering
    const timerRef = useRef(0);

    // useEffect hook
    // reset clearTimeout method for toast notification
    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    // useLazyQuery hook
    // getOutfits must be called to get all users outfits from database
    const [getOutfits, { loading, data }] = useLazyQuery(GET_OUTFITS);

    // useMutation hooks
    // adds item to database
    const [addTop] = useMutation(ADD_TOP);
    const [addBottom] = useMutation(ADD_BOTTOM);
    const [addShoes] = useMutation(ADD_SHOES);
    const [addAccessory] = useMutation(ADD_ACCESSORIES);
    const [addOutfit] = useMutation(ADD_OUTFIT);

    // addToNewOutfit method
    // add the new outfit to database
    const addToNewOutfit = async (item) => {
        try {
            switch(item.category.name){
                case `Women's Dresses`:
                case `Women's Tops`:
                case `Men's Shirts`:
                    await addOutfit({ 
                        variables: { outfitName: outfitName } 
                    });
                    await addTop({
                        variables: { outfitName: outfitName, top: item._id }
                    });
                    break;
                case `Women's Bottoms`:
                case `Men's Bottoms`:
                    await addOutfit({ 
                        variables: { outfitName: outfitName } 
                    });
                    await addBottom({
                        variables: { outfitName: outfitName, bottom: item._id }
                    });
                    break;
                case `Women's Shoes`:
                case `Men's Shoes`:
                    await addOutfit({ 
                        variables: { outfitName: outfitName } 
                    });
                    await addShoes({
                        variables: { outfitName: outfitName, shoes: item._id }
                    });
                    break;
                case `Women's Accessories`:
                case `Men's Accessories`:
                    await addOutfit({ 
                        variables: { outfitName: outfitName } 
                    });
                    await addAccessory({
                        variables: { outfitName: outfitName, accessories: item._id }
                    });
                    break;
            }

            await checkOutfits();
        } catch (err) {
            console.error(err);
        }
    };

    // addToExistingOutfit method
    // update existing outfit in database
    const addToExistingOutfit = async (outfitName, item) => {
        switch(item.category.name){
            case `Women's Dresses`:
            case `Women's Tops`:
            case `Men's Shirts`:
                await addTop({
                    variables: { outfitName: outfitName, top: item._id }
                });
                break;
            case `Women's Bottoms`:
            case `Men's Bottoms`:
                await addBottom({
                    variables: { outfitName: outfitName, bottom: item._id }
                });
                break;
            case `Women's Shoes`:
            case `Men's Shoes`:
                await addShoes({
                    variables: { outfitName: outfitName, shoes: item._id }
                });
                break;
            case `Women's Accessories`:
            case `Men's Accessories`:
                await addAccessory({
                    variables: { outfitName: outfitName, accessories: item._id }
                });
                break;
        }

        await checkOutfits();
    };

    // checkOutfits function
    // check if user has any outfits saved and update the outfits state
    const checkOutfits = async () => {
        const { data } = await getOutfits();
        setOutfits(data.outfits);
    };

    // Render options to add clothing item to new/existing outfit:
    // If user is logged in, the Add to Outfit button display
    // If user has saved outfits, the Add to Existing Outfit dropdown menu displays
    return(
    <>
    {   
        Auth.loggedIn() ? 
            <>
            <AlertDialog.Root id='dialog'>
            <AlertDialog.Trigger>
                <Button 
                    type='button' 
                    aria-label='Add Item to an Outfit' 
                    name='addToOutfit'
                    onClick={checkOutfits}
                >
                <AddOutlinedIcon /> Add to Outfit
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth='500px'>
                <AlertDialog.Title>Adding {product.title} to outfit!</AlertDialog.Title>
                <AlertDialog.Description size='2'>
                Please click one of the options below.
                </AlertDialog.Description>
                <Flex gap='3' mt='4' justify='center' wrap='wrap'>

                <Popover.Root>
                    <Popover.Trigger>
                        <Button 
                            variant='soft'
                            type='button' 
                            aria-label='Add Item to New Outfit' 
                            name='addToNewOutfit'
                        >
                        Add to New Outfit
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content maxWidth='500px'>
                    <Text>Please enter a name for your new outfit:</Text>
                    <Flex direction='column' gap='3' mt='4'>
                        <TextField.Root 
                        value={outfitName} 
                        onChange={(e) => setOutfitName(e.target.value)} 
                        placeholder='ex. Concert Fit'>
                        </TextField.Root>
                    </Flex>
                    <Flex gap='3' mt='4' justify='center' wrap='wrap'>
                    <Popover.Close>
                        <Button 
                            variant='soft'
                            type='button' 
                            aria-label='Create new outfit and add item to it' 
                            name='addToNewOutfit'
                            onClick={() => { 
                                addToNewOutfit(product);
                                setOpenNew(false);
                                window.clearTimeout(timerRef.current);
                                timerRef.current = window.setTimeout(() => {
                                    setOpenNew(true);
                                }, 100);
                            }}
                        >
                        Submit
                        </Button>
                    </Popover.Close>
                    <Popover.Close>
                        <Button 
                            type='button'
                            variant='soft' 
                            color='red'
                        >
                        Cancel
                        </Button>
                    </Popover.Close>
                    </Flex>
                    </Popover.Content>
                </Popover.Root>

                {    outfits.length ?
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Button 
                                    variant='soft'
                                    type='button' 
                                    aria-label='Add Item to Existing Outfit' 
                                    name='addToExistingOutfit'
                                >
                                Add to Existing Outfit
                                <DropdownMenu.TriggerIcon />
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                            {   
                                outfits.map((outfit) => 
                                    <DropdownMenu.Item 
                                    key={outfit._id}
                                    onClick={() => {
                                            addToExistingOutfit(outfit.outfitName, product);
                                            setOpenExisting(false);
                                            window.clearTimeout(timerRef.current);
                                            timerRef.current = window.setTimeout(() => {
                                                setOpenExisting(true);
                                            }, 100);
                                    }}>
                                    {outfit.outfitName}
                                    </DropdownMenu.Item>
                            )}
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    :
                        null
                }

                <AlertDialog.Cancel>
                    <Button 
                        type='button'
                        variant='soft' 
                        color='red'
                    >
                    Cancel
                    </Button>
                </AlertDialog.Cancel>
                </Flex>
            </AlertDialog.Content>
            </AlertDialog.Root>

            <Toast.Root className='ToastRoot' open={openNew} onOpenChange={setOpenNew}>
                <Flex direction='column'>
                <Toast.Title className='ToastTitle'>Success!</Toast.Title>
                <Toast.Description>
                    <Flex direction='column'>
                    Your new outfit has been created.
                    <Link href='/my-outfits' weight='medium'>Go to My Outfits</Link>
                    </Flex>
                </Toast.Description>
                </Flex>
            </Toast.Root>

            <Toast.Root className='ToastRoot' open={openExisting} onOpenChange={setOpenExisting}>
                <Flex direction='column'>
                <Toast.Title className='ToastTitle'>Success!</Toast.Title>
                <Toast.Description>
                    <Flex direction='column'>
                    Your outfit has been updated.
                    <Link href='/my-outfits' weight='medium'>Go to My Outfits</Link>
                    </Flex>
                </Toast.Description>
                </Flex>
            </Toast.Root>
            </>
            :
            null 
    }
    
    </>
    );
}

export default AddToOutfit;