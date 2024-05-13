import { useState, useEffect } from 'react';

import { GET_USER, GET_OUTFITS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_OUTFIT } from '../utils/mutations';
import Outfits from '../components/Outfits';

import { Container, Heading, Flex, Button, Dialog, Spinner, TextField } from '@radix-ui/themes';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// use onBlur={(event) => {check if user already has an outfit with that name}}

const OutfitsPage = ({ open, onClose, onSave }) => {

  const { loading, data: outfitData } = useQuery(GET_OUTFITS);
  const [addOutfit] = useMutation(ADD_OUTFIT);
  const [outfitState, setOutfitState] = useState([]);
  const [formState, setFormState] = useState('');

  useEffect(() => {
    if (!loading && outfitData) {
      setOutfitState(outfitData.outfits);
    }
  }, [loading, outfitData])

  const handleAddOutfit = async (outfitName) => {
    try {
      const newData = await addOutfit({
        variables: {outfitName: outfitName}
      });
      setOutfitState(newData.data.addOutfit);
    } catch (err) {
      
    }
  };

  if (!loading && outfitData) {
  return (
    <>
    <Container>
    <Heading 
    as='h2' 
    align='center'
    className='cursive' 
    style=
      {{ 
        paddingBottom: 'var(--space-6)',
        fontSize: '2.5rem'
      }}
    >
    My Outfits
    </Heading>
    <Flex gap='3' justify='center' width='auto' direction='row' wrap='wrap'>
      <Outfits setOutfitState={setOutfitState} outfitData={outfitState}/>
    </Flex>
    <Dialog.Root>
    <Dialog.Trigger>
      <Flex justify='center' pt='5'>
        <Button>
          <AddOutlinedIcon />
          Add New Outfit
        </Button>
      </Flex>
    </Dialog.Trigger>
    <Dialog.Content maxWidth="450px"> 
    <Dialog.Title>Please enter a name for your outfit:</Dialog.Title>
    <Flex direction="column" gap="3">
      <label>
        <TextField.Root value={formState} onChange={(event)=>{setFormState(event.target.value)}} placeholder="ex. Street Style"></TextField.Root>
      </label>
    </Flex>
    <Flex gap="3" mt="4" justify="end">
      <Dialog.Close>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button onClick={()=> handleAddOutfit(formState)}>Add Outfit</Button>
      </Dialog.Close>
    </Flex>
    </Dialog.Content>
    </Dialog.Root>
    </Container>
    </>
  );
} else {
  return (
    <Container width='auto' align='center'>
      <Flex direction='column' align='center'>
        <Spinner size='3' />
        <Heading
        className='cursive'
        align='center'
        style=
          {{ 
            paddingTop: 'var(--space-6)',
            fontSize: '2.81rem',
            lineHeight: 1.5,
          }}
        >
        Loading your outfits...
        </Heading>
      </Flex>
    </Container>
  )
}
};

export default OutfitsPage;
