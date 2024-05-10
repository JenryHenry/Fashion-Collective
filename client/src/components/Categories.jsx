import { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../utils/actions';
import { GET_CATEGORIES, GET_TYPE_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

function Categories({ setCategoryProducts }) {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { data: categoryData } = useQuery(GET_CATEGORIES);

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

  const handleClick = async (event) => {
    event.preventDefault();

    // const category = event.target.textContent;

    // try {
    //   await getCategoryProducts({ variables: { name: category } }); 

    //   if(categoryProducts){
    //     setCategoryProducts(categoryProducts);
    //   }

    // } catch (err) {
    //   console.error(err);
    // }
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

// import { Box, Flex, SegmentedControl } from '@radix-ui/themes';

// function Categories({ setCategoryProducts, setSearch }) {
//   const { loading, data: categoryData } = useQuery(GET_CATEGORIES);

//   const[getCategoryProducts, { data: categoryProducts }] = useLazyQuery(GET_TYPE_PRODUCTS);

//   const handleClick = async (event) => {
//     event.preventDefault();

//     const selectedCategory = event.target.textContent;

//     try {
//       setSearch('');

//       await getCategoryProducts({ variables: { name: selectedCategory } }); 

//       console.log(categoryProducts);

//       if(categoryProducts){
//         setCategoryProducts(categoryProducts);
//       }

//     } catch (err) {
//       console.error(err);
//     }
//   };


//   if(!loading){
//     return (
//       <Flex wrap='wrap' direction='column'>
//       <Box as='div' align='center' pb='6'>
//           <SegmentedControl.Root size='2' onClick={handleClick}>
//             {categoryData.categories.map((category) => (
//               <SegmentedControl.Item key={category._id} value={category.name} >{category.name}</SegmentedControl.Item>
//             ))}
//           </SegmentedControl.Root>
//       </Box>
//       </Flex>
//     );
//   }
// }