import React, { useState } from 'react'
import styles from "./CardFilter2.module.css";

const CardFilter2 = ({ data }) => {
    
    const [selected, setSelected] = useState([]);

    const isItemSelected = (id) => !!selected.find((el) => el === id);

    const handleClick = (id) => {
        const itemSelected = isItemSelected(id);

        setSelected((currentSelected) =>
            itemSelected
                ? currentSelected.filter((el) => el !== id)
                : [...currentSelected, id],
        );
    };

  return (
    <div className={styles.cardFilter}>
        <div className={styles.arrow}>
            <img src='' alt='' />
        </div>
        <div className={styles.filters}>
            {data.map(({ id, title, icon }) => (
                <div
                onClick={()=>handleClick(id)}
                className={isItemSelected(id) ? styles.cardSelected : styles.card}
                tabIndex={0}
                >
                    <img className={styles.cardImage} src={icon} alt={title} />
                    <h3 className={styles.cardTitle}>{title}</h3>
                </div>
            ))}
        </div>
        <div className={styles.arrow}>
            <img src='' alt='' />
        </div>
    </div>
  )
}

export default CardFilter2
