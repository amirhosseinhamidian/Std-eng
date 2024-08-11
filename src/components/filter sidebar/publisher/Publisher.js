import React, { useContext, useState } from 'react';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import Styles from './Publisher.module.css';
import SearchContext from '../../../contexts/SearchContext';

function Publisher({ items }) {
  const [showItems, setShowItems] = useState(false);
  const {
    selectedPublisher,
    setSelectedPublisher,
  } = useContext(SearchContext);

  const toggleItems = () => {
    setShowItems(!showItems);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    const selectedItem = items.find(item => item.name === newValue);
    setSelectedPublisher(selectedItem ? selectedItem.id : '');
  };

  const selectedValue = items.find(item => item.id === selectedPublisher)?.name || '';

  return (
    <>
      <section className={Styles.container}>
        <div className={Styles.filterRow} onClick={toggleItems}>
          <img
            className={Styles.icon}
            alt=""
            src='/location.svg'
          />
          <div className={Styles.title}>
            Publisher
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
            className={Styles.radioContainer}
          >
            <FormControlLabel
              value="" 
              control={<Radio color="warning" size='small' />}
              label="All" 
            />
            {items.map((item) => (
              <FormControlLabel
                key={item.id}
                value={item.name} // Use item.name as the value
                control={<Radio color="warning" size='small' />}
                label={item.name}
                classes={{ label: Styles.radioItem }}
              />
            ))}
          </RadioGroup>
        )}
        <hr className={Styles.horizontalLine} />
      </section>
    </>
  );
}

export default Publisher;
