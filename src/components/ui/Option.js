import React from 'react';
import styles from './Option.module.css';

const Option = ({ optionText, isActive, onSelect }) => {
  return (
    <div
      className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
      onClick={onSelect}
    >
      {optionText}
    </div>
  );
};

export default Option;
