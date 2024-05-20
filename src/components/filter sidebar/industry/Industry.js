import React, { useState } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material';
import Styles from './Industry.module.css'

function Industry({items}) {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  const handleCheckboxChange = (event) => {
    const selectedItem = event.target.name;
    if (selectedItems.includes(selectedItem)) {
      setSelectedItems(selectedItems.filter(item => item !== selectedItem));
    } else {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  return (
    <>
    <section className={Styles.container}>
        <div className={Styles.filterRow} onClick={toggleCheckboxes}>
          <img
            className={Styles.icon}
            alt=""
            src='/factory.svg'
          />
          <div className={Styles.title}>
            Industry
          </div> 
          <div className={Styles.spacer} /> 
          <div className={`${Styles.arrowIconWrapper} ${showCheckboxes ? Styles.rotated : ''}`}>
            <img
              className={Styles.arrowIcon}
              alt=""
              src="/chevronbackward.svg"
            /> 
          </div>
        </div>
        {showCheckboxes && (
          <div className={Styles.checkboxContainer}>
            {items.map((item) =>(
              <FormControlLabel
              control={
                <Checkbox 
                  color='warning' 
                  size='small'
                  onChange={handleCheckboxChange}
                  name={item}
                  checked={selectedItems.includes(item)}
                />}
              label={item}
              classes={{label: Styles.checkboxItem}}
            />
            ))}
          </div>
        )}
        <hr className={Styles.horizontalLine} />
      </section>
    </>
  );
};

export default Industry;
