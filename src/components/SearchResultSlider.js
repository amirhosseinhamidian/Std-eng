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
const SearchResultSlider = ({ details, keyword }) => {
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
  const highlightKeyword = (sentence, keyword) => {
    const lowerKeyword = String(keyword).toLowerCase();
    const regex = new RegExp(`(${lowerKeyword})`, 'gi');
    return sentence?.split(regex).map((word, index) => {
      const wordString = String(word); // Cast word to string
      return (
        regex.test(wordString?.toLowerCase()) ? 
        <span key={index} className={styles.highlight}>
          {wordString}
        </span> : 
        word
      );
    });
  };

  return (
      <Slider {...sliderSettings} className={styles.slider} ref={sliderRef}>
        {details.map((detail, index) => (
          <div key={index} className={styles.slide}>
            <b className={styles.pageNumber}>PAGE: {detail.page}</b>
            <span className={styles.sentence}>{highlightKeyword(detail.sentence, keyword)}</span>
          </div>
        ))}
      </Slider>
    );
  };
  export default SearchResultSlider;