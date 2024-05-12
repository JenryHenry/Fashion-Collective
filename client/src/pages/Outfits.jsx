import { useState, useEffect } from 'react';

import { GET_USER, GET_OUTFITS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_OUTFIT } from '../utils/mutations';
import Outfits from '../components/Outfits';
import { Container, Grid, Heading, Flex, Box, Button, Dialog, Text, TextField } from '@radix-ui/themes';

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
    <Heading as='h2' align='center'>My Outfits</Heading>
    <Grid columns={{ initial: '1', md: '3', lg:'4', xl:'5' }} gap='3' mb="2" width='auto'>
      <Outfits setOutfitState={setOutfitState} outfitData={outfitState}/>
    </Grid>
    <Dialog.Root>
    <Dialog.Trigger>
      <Button>Add Outfit</Button>
    </Dialog.Trigger>
    <Dialog.Content maxWidth="450px"> 
    <Dialog.Title>What do you want to call this outfit?</Dialog.Title>
    <Flex direction="column" gap="3">
      <label>
        <TextField.Root value={formState} onChange={(event)=>{setFormState(event.target.value)}} placeholder="Enter a name for your outfit"></TextField.Root>
      </label>
    </Flex>
    <Flex gap="3" mt="4" justify="end">
      <Dialog.Close>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button onClick={()=> handleAddOutfit(formState)}>Ok!</Button>
      </Dialog.Close>
    </Flex>
    </Dialog.Content>
    </Dialog.Root>
    </Container>
    </>
  );
} else {
  return (
    <h1>Loading...</h1>
  )
}
};

export default OutfitsPage;
