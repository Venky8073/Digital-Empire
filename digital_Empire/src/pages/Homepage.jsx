import React from 'react'
import Carousel from '../components/Carousel';
import { Heading, Image, SimpleGrid } from "@chakra-ui/react";
import "../style_modules/home.css";

const Homepage = () => {
  const imageArr = ["https://m.media-amazon.com/images/I/61HHS0HrjpL._SX679_.jpg", "https://m.media-amazon.com/images/I/61imYpK33qL._AC_UY327_FMwebp_QL65_.jpg", "https://m.media-amazon.com/images/I/91VR2ZXL9LL._SX679_.jpg", "https://m.media-amazon.com/images/I/81Fm0tRFdHL._SX679_.jpg", "https://m.media-amazon.com/images/I/51SKmu2G9FL._AC_UY327_FMwebp_QL65_.jpg", "https://m.media-amazon.com/images/I/71GIYSZpW+L._SX679_.jpg", "https://m.media-amazon.com/images/I/61nBzBREzGL._AC_UY327_FMwebp_QL65_.jpg", "https://m.media-amazon.com/images/I/91RnDCyguML._SX679_.jpg", "https://m.media-amazon.com/images/I/81Uc3NUrdkL._AC_UY327_FMwebp_QL65_.jpg"];
  return (
    <div>
      <section id='hero'>
        <div className="image-container">
          <Image src="home-back.jpg" h="35rem" w="100%" mt="1rem" className='image'></Image>
          <div className="text-overlay">
            <h1>Welcome to Digital Empire</h1>
            <p>we provide latest and 100% quality assured electronics at competitive prices</p>
          </div>
        </div>
      </section>
      <section id='latest-products'>
        <Heading size="2xl" mt="5rem" color="tomato">Latest Products</Heading>
        <Carousel slides={imageArr}></Carousel>
      </section>
      <section id='features'>
        <Heading size="2xl" mt="5rem" mb="2rem" color="tomato">Services</Heading>
        <SimpleGrid columns={{ lg: 2, md: 1, sm: 1 }} spacing="12" mx="auto" w="90%">
          <Image src="customer-service.jpg"></Image>
          <Image src="cash-on-delivery.jpg"></Image>
          <Image src='return-service.jpg'></Image>
          <Image src='pay-later-service.jpg'></Image>
        </SimpleGrid>
      </section>
    </div>
  )
}

export default Homepage