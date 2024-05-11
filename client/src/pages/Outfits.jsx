import { useState, useEffect } from 'react';

import { GET_USER, GET_OUTFITS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { DELETE_OUTFIT, DELETE_TOP, DELETE_BOTTOM, DELETE_SHOES, DELETE_ACCESSORIES } from '../utils/mutations';
import Outfits from '../components/Outfits';
import { Container, Grid, Heading, Flex, Box, } from '@radix-ui/themes';

// use onBlur={(event) => {check if user already has an outfit with that name}}

const OutfitsPage = () => {

  const { loading, data: outfitData } = useQuery(GET_OUTFITS);

  if (!loading) {
  console.log(outfitData);
  return (
    <>
    <Container>
    <Heading as='h2' align='center'>My Outfits</Heading>
    <Grid columns={{ initial: '1', md: '3', lg:'4', xl:'5' }} gap='3' width='auto'>
      <Outfits outfitData={outfitData}/>
    </Grid>
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
