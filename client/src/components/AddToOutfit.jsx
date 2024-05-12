import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_OUTFITS } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise, pickSuccessWord } from '../utils/helpers';

import Auth from '../utils/auth';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const AddToOutfit = ({ product }) => {
    // Accessing state and dispatch from context
    const [state, dispatch] = useStoreContext();

    // useState hook
    // holds all user outfits
    const [outfits, setOutfits] = useState([]);

    // useLazyQuery hook
    // getOutfits must be called to get all users outfits from database
    const [getOutfits, { loading, data }] = useLazyQuery(GET_OUTFITS);

    // checkOutfits function 
    const checkOutfits = async () => {
        const { data } = await getOutfits();
        setOutfits(data.outfits);
    };

    // addToNewOutfit method
    const addToNewOutfit = async (item) => {
        console.log(outfits);
        console.log(item);
    };

    // addToExistingOutfit method
    const addToExistingOutfit = async (item) => {
        console.log(outfits);
        console.log(item);
    };

    // Render options to add clothing item to new/existing outfit:
    // If user is logged in, the Add to Outfit button display
    // If user has saved outfits, the Add to Existing Outfit button displays
    return(
        <>
        {   
            Auth.loggedIn() ? 
                <>
                <AlertDialog.Root>
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
                <AlertDialog.Content maxWidth='450px'>
                    <AlertDialog.Title>{pickSuccessWord()}</AlertDialog.Title>
                    <AlertDialog.Description size='2'>
                        <Flex direction='column'>
                        Adding {product.title} to your outfit... <br/>
                        Please click one of the options below.
                        </Flex>
                    </AlertDialog.Description>
                    <Flex gap='3' mt='4' justify='center' wrap='wrap'>
                    <AlertDialog.Action>
                        <Button 
                            variant='soft'
                            type='button' 
                            aria-label='Add Item to New Outfit' 
                            name='addToNewOutfit'
                            onClick={() => addToNewOutfit(product)}
                        >
                        Add to New Outfit
                        </Button>
                    </AlertDialog.Action>
                    {    outfits.length ?
                            <>
                            <AlertDialog.Action>
                            <Button 
                                variant='soft'
                                type='button' 
                                aria-label='Add Item to Existing Outfit' 
                                name='addToExistingOutfit'
                                onClick={() => addToExistingOutfit(product)}
                            >
                            Add to Existing Outfit
                            </Button>
                            </AlertDialog.Action>
                            </>
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
                </>
                :
                null 
        }
        </>
    );
}

export default AddToOutfit;