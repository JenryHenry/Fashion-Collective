import { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY, UPDATE_PRODUCTS } from '../utils/actions';
import { GET_CATEGORIES, GET_TYPE_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

import { Flex, Tabs } from '@radix-ui/themes';

const Categories = () => {
  
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data } = useQuery(GET_CATEGORIES);

  const[getCategoryProducts, { loading: loadingProducts, data: categoryProducts }] = useLazyQuery(GET_TYPE_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: data.categories,
      });
      data.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    }
  }, [data, loading, dispatch]);
  
  if(!loading){
    return(
      <Flex asChild justify='center' pb='6' wrap='wrap'>
        <Tabs.Root wrap='wrap'>
          <Tabs.List>
            {data.categories.map((category) => (
              <Tabs.Trigger
              key={category._id}
              value={category.name}
              style={{
                fontSize: 'var(--font-size-3)',
              }}
              onClick=
                { 
                  async(event) => {
                  event.preventDefault();

                  dispatch({
                    type: UPDATE_CURRENT_CATEGORY,
                    currentCategory: category._id,
                  });

                  const response = await getCategoryProducts({ variables: { _id: category._id } });
                  
                  dispatch({
                    type: UPDATE_PRODUCTS,
                    products: response.data.getTypeProducts,
                  });
                
                  response.data.getTypeProducts.forEach((product) => {
                    idbPromise('products', 'put', product);
                  });
                }}
              >
              {category.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </Flex>
    );
  }
}

export default Categories;