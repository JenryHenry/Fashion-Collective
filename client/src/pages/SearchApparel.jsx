import { useState, useEffect } from 'react';
import { ADD_TOP, ADD_ACCESSORIES } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const SearchApparel = () => {
    const [addAccessories] = useMutation(ADD_ACCESSORIES);
    const [addTop] = useMutation(ADD_TOP);

    const handleAddTop = async () => {
        const top = '663afcdf22e65882a09b3d6f';
        const outfitName = 'outfit8';
        try {
            const { data } = await addTop({
                variables: { outfitName, top }
            })
        }


        catch (err) {
            console.log(err);
        }
    };

    const handleAddAccessories = async () => {
        const accessories = '663afcdf22e65882a09b3d7d';
        const outfitName = 'outfit8';
        try {
            const { data } = await addAccessories({
                variables: { outfitName, accessories }
            })
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <>
            <div>
                <p>Search Apparel page here</p>
                <button onClick={handleAddTop}>Add Top</button>
                <button onClick={handleAddAccessories}>Add Watch</button>
            </div>
        </>
    )
};

export default SearchApparel;