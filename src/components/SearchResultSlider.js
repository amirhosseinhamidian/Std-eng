import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./SearchResultSlider.module.css"; 

const SearchResultSlider = ({ details }) => {
    const sliderSettings = {
      // Configure your slider settings here
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
        <Slider {...sliderSettings} className={styles.slider}>
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