import { useQuery } from '@apollo/client';
import { GET_FEATURED } from '../utils/queries';

import { Box, Button, Flex } from '@radix-ui/themes';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const FeaturedItemsCarousel = () => {
  // useQuery hook
  // staleTime marks the fetched data fresh for 60 minutes
  const { loading, data } = useQuery(GET_FEATURED, { staleTime: 3600000 });

  // handleClick method
  // will save the featured item title when user clicks
  // on its button, then redirects to the search page
  const handleClick = (title) => {
    try {
      sessionStorage.setItem('featuredItem', title);
      window.location.assign('/search');
    } catch (err) {
      console.log(err);
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  if(!loading){
    return(
      <Carousel
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      keyBoardControl={true}
      containerClass='carousel-container'
      removeArrowOnDeviceType={['mobile']}
      dotListClass='custom-dot-list-style'
      >
          {  data.getFeatured.map((product) => 
              <Box as='div' key={product._id} pb='5'>
              <img 
                  src={'./images/' + product.image}
                  alt={product.description}
                  style={{ 
                          width: '100%',
                          aspectRatio: '1/1',
                          objectFit: 'cover' 
                        }}
              />
              <Flex justify='center'>
                <Button type='button' variant='surface' onClick={() => {handleClick(product.title)}}>
                {product.title}</Button>
              </Flex>
              </Box>
            ) 
          }  
      </Carousel>
    );
  }
}

export default FeaturedItemsCarousel;