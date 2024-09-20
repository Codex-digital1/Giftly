// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation  } from 'swiper/modules'
import Slide from './Slide'
import { useRef, useState } from 'react'
import Container from '../../shared/Container'


export default function Carousel() {
  const swiperRef = useRef(null);

  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  const handleClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };
  return (
  <Container> 
    <div className='md:py-10 mx-auto'>
  <Swiper
    ref={swiperRef}
    spaceBetween={30}
    centeredSlides={true}
    loop={true}
    pagination={{
      clickable: true,
    }}
    autoplay={{
      delay: 5000,
      disableOnInteraction: true,
    }}
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    className='mySwiper'
  >
    <SwiperSlide
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         onClick={handleClick}
    >
      
      <Slide/>
    </SwiperSlide>
    <SwiperSlide
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         onClick={handleClick}
    >
      <Slide/>
    </SwiperSlide>
    <SwiperSlide
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         onClick={handleClick}
    >
      <Slide/>
    </SwiperSlide>
    
    
   
    
  </Swiper>
</div></Container>
  )
}