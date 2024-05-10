import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../utils/actions';
import { GET_CATEGORIES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

import { Box, Flex, SegmentedControl } from '@radix-ui/themes';

function Categories() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(GET_CATEGORIES);

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

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <Flex wrap='wrap' direction='column'>
    <Box as='div' align='center' pb='6'>
        <SegmentedControl.Root size='2'>
          {categories.map((category) => (
            <SegmentedControl.Item key={category._id} value={category.name} onClick={() => handleClick(category._id)}>{category.name}</SegmentedControl.Item>
          ))}
        </SegmentedControl.Root>
    </Box>
    </Flex>
  );

}

export default Categories;