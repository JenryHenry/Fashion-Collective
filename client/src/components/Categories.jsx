import { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../utils/actions';
import { GET_CATEGORIES, GET_TYPE_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

import { Box, Flex, SegmentedControl } from '@radix-ui/themes';

function Categories({ setCategoryProducts }) {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(GET_CATEGORIES);

  // const[getCategoryProducts, { loading, data: categoryProducts }] = useLazyQuery(GET_TYPE_PRODUCTS);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  return (
    <Flex wrap='wrap' direction='column'>
    <Box as='div' align='center' pb='6'>
        <SegmentedControl.Root size='2'>
          {categories.map((category) => (
            <SegmentedControl.Item key={category._id} value={category.name} onClick={(event) => {
              event.preventDefault();
              dispatch({
                type: UPDATE_CURRENT_CATEGORY,
                currentCategory: category._id,
              });}}>{category.name}</SegmentedControl.Item>
          ))}
        </SegmentedControl.Root>
    </Box>
    </Flex>
  );
}

export default Categories;
