import React, { useState } from 'react'
import { Radio,RadioGroup, FormControlLabel } from '@mui/material';
import Styles from './DocumentType.module.css'

function DocumentType({items}) {
  const [showItems, setShowItems] = useState(false);

  const toggleItems = () => {
    setShowItems(!showItems);
  };
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue === selectedValue ? '' : newValue);
  };

  return (
    <>
      <section className={Styles.container}>
        <div className={Styles.filterRow} onClick={toggleItems}>
          <img
            className={Styles.icon}
            alt=""
            src='/document.svg'
          />
          <div className={Styles.title}>
            Document Type
          </div> 
          <div className={Styles.spacer} /> 
          <div className={`${Styles.arrowIconWrapper} ${showItems ? Styles.rotated : ''}`}>
            <img
              className={Styles.arrowIcon}
              alt=""
              src="/chevronbackward.svg"
            /> 
          </div>
        </div>
        {showItems && (
          <RadioGroup 
          value={selectedValue}  
          onChange={handleChange}
          className={Styles.redioContainer}
          >
            <FormControlLabel
              value="" // Set value to an empty string to represent deselection
              control={<Radio color="warning" size='small' />}
              label="All" // Display text for the option that deselects the radio button
            />
            {items.map((item) => (
              <FormControlLabel
                key={item}
                value={item}
                control={<Radio color="warning" size='small' />}
                label={item}
                classes={{ label: Styles.radioItem }} 
              />
            ))}
          </RadioGroup>
        )}
        <hr className={Styles.horizontalLine} />
      </section>
    </>
  );
};

export default DocumentType;
