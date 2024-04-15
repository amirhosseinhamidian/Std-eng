import React, { useState } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material';
import Styles from './Discipline.module.css'

function Discipline({items}) {
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
            src='/engineer.svg'
          />
          <div className={Styles.title}>
            Discipline
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

export default Discipline;

