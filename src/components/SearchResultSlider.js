import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./SearchResultSlider.module.css"; 

// Arrow Component Wrapper
const CustomPrevArrow = ({ onClick }) => (
  <div className={styles.arrowPrev} onClick={onClick}>
    <b>&lt;</b>
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div className={styles.arrowNext} onClick={onClick}>
    <b>&gt;</b>
  </div>
);
const SearchResultSlider = ({ details }) => {
  const sliderSettings = {
    // Configure your slider settings here
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  const sliderRef = React.useRef(null);
  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  return (
      <Slider {...sliderSettings} className={styles.slider} ref={sliderRef}>
        {details.map((detail, index) => (
          <div key={index} className={styles.slide}>
            <b className={styles.pageNumber}>PAGE: {detail.page}</b>
            <span className={styles.sentence}>{detail.sentence}</span>
          </div>
        ))}
      </Slider>
    );
  };
  export default SearchResultSlider;