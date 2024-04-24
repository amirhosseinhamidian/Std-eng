import React, { useState }  from 'react'
import { Slider } from '@mui/material';
import Styles from './PublicationDate.module.css'

function PublicationDate() {
  const [showSlider, setShowSlider] = useState(false);

  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  const [dateRange, setDateRange] = useState([1964, 2024]);

  const handleInputChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (type === "min") {
        setDateRange([value, dateRange[1]]);
      } else if (type === "max") {
        setDateRange([dateRange[0], value]);
      }
    }
  };

  const handleSliderChange = (event, newValue) => {
    setDateRange(newValue);
  };
  return (
    <>
      <section className={Styles.container}>
        <div className={Styles.filterRow} onClick={toggleSlider}>
          <img
            className={Styles.icon}
            alt=""
            src='/date.svg'
          />
          <div className={Styles.title}>
            Publication Date (Year)
          </div> 
          <div className={Styles.spacer} /> 
          <div className={`${Styles.arrowIconWrapper} ${showSlider ? Styles.rotated : ''}`}>
            <img
              className={Styles.arrowIcon}
              alt=""
              src="/chevronbackward.svg"
            /> 
          </div>
        </div>
        {showSlider && 
          <div>
          <div className={Styles.range}>
            <div className={Styles.sliderTags}>from:</div>
            <input 
              type="number" 
              value={dateRange[0]} 
              className={`${Styles.rangeInput}`} 
              onChange={(e) => handleInputChange(e, "min")}/>
          </div>
          <div className={Styles.range}>
            <div className={Styles.sliderTags}>to:</div>
            <input 
              type="number" 
              value={dateRange[1]} 
              className={Styles.rangeInput}
              onChange={(e) => handleInputChange(e, "max")}
              />
          </div>
          <Slider
            value={dateRange}
            onChange={handleSliderChange}
            min={1969}
            max={2024}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            color='warning'
            className={Styles.slider}
          />
        </div>
        }
      </section>
    </>   
  );
};

export default PublicationDate;
