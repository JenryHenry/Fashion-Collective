import { Box, Text } from '@radix-ui/themes';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

export default () => (
    <Carousel
    swipeable={false}
    draggable={false}
    showDots={true}
    responsive={responsive}
    keyBoardControl={true}
    containerClass='carousel-container'
    removeArrowOnDeviceType={['mobile']}
    dotListClass='custom-dot-list-style'
    >
        {/* Randomly populate 10 clothing items */}
        <Box as='div'>
          <img 
              src='./images/blue-purse.jpg'
              // src=`./images/{image}`
              // alt={product.description}
              style={{ 
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover' 
                    }}
          />
          <Text>Item 1</Text>
          {/* <Text>{product.title}</Text> */}
        </Box>
    </Carousel>
);