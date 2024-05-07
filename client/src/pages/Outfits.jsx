import { useState, useEffect } from 'react';

import { GET_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { DELETE_OUTFIT, DELETE_TOP, DELETE_BOTTOM, DELETE_SHOES, DELETE_ACCESSORIES } from '../utils/mutations';

// use onBlur={(event) => {check if user already has an outfit with that name}}

const OutfitsPage = () => {

  return (
    <>
      <div>
        <p>Outfits Page Goes Here</p>
      </div>
    </>
  );
};

export default OutfitsPage;
