import React, { useState } from 'react'
import "../style_modules/carousel.css"
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const Carousel = ({ slides }) => {
  const [slide, setSlide] = useState(0);
  const nextSlide = () => {
    setSlide((prev) => {
      if (prev + 1 < slides.length) {
        return prev + 1;
      }
      else {
        return prev;
      }
    });
  }
  const prevSlide = () => {
    setSlide((prev) => {
      if (prev - 1 >= 0) {
        return prev - 1;
      }
      else {
        return prev;
      }
    });
  }
  return (
    <div className='carousel'>
      <BsArrowLeftCircleFill className='arrow arrow-left' onClick={prevSlide} />
      {slides.map((el, index) => {
        return <img
          key={index}
          src={el}
          alt="slide_image"
          className={slide === index ? "slide" : "slide slide-hidden"} />
      })}
      <BsArrowRightCircleFill className='arrow arrow-right' onClick={nextSlide} />
      <span className='indicators'>
        {slides.map((_, ind) => {
          return <button
            key={ind}
            onClick={null}
            className={slide === ind ? "indicator" : "indicator indicator-inactive"}
          ></button>
        })}
      </span>
    </div>
  )
}

export default Carousel