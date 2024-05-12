import { useLazyQuery } from '@apollo/client';
import { GET_OUTFITS } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise, pickSuccessWord } from '../utils/helpers';

import Auth from '../utils/auth';

import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const AddToOutfit = ({ product }) => {
    // Accessing state and dispatch from context
    const [state, dispatch] = useStoreContext();

    // useLazyQuery hook
    // getOutfits must be called to get all users outfits from database
    const [getOutfits, { loading, data }] = useLazyQuery(GET_OUTFITS);

    // handleAddToOutfit method
    const handleAddToOutfit = async (item) => {
    };

    // Render option to add clothing item to outfit
    // Only appears if user is logged in
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
                    >
                    <AddOutlinedIcon /> Add to Outfit
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth='450px'>
                    <AlertDialog.Title>{pickSuccessWord()}</AlertDialog.Title>
                    <AlertDialog.Description size='2'>
                        <Flex direction='column'>
                        <Text>Adding {product.title} to your outfit...</Text>
                        <Text>Please click one of the options below.</Text>
                        </Flex>
                    </AlertDialog.Description>
                    <Flex gap='3' mt='4' justify='center' wrap='wrap'>
                    <AlertDialog.Action>
                        <Button variant='soft'>
                        Add to New Outfit
                        </Button>
                    </AlertDialog.Action>
                    <AlertDialog.Action>
                        <Button variant='soft'>
                        Add to Existing Outfit
                        </Button>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel>
                        <Button variant='soft' color='red'>
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