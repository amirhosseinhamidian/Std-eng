import React, { useState } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material';
import Styles from './Region.module.css'

function Region({items}) {
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };
  return (
    <>
    <section className={Styles.container}>
        <div className={Styles.filterRow} onClick={toggleCheckboxes}>
          <img
            className={Styles.icon}
            alt=""
            src='/location.svg'
          />
          <div className={Styles.title}>
            Region
          </div> 
          <div className={Styles.spacer} /> 
          <div className={Styles.arrowIconWrapper}>
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
              control={<Checkbox color='warning' size='small'/>}
              label={item}
              className={Styles.checkboxItem}
            />
            ))}
          </div>
        )}
        <hr className={Styles.horizontalLine} />
      </section>
    </>
  );
};

export default Region;
