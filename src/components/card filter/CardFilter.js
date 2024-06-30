import React, { useRef, useState } from 'react'
import styles from "./CardFilter.module.css";

const CardFilter = ({ data }) => {
    
    const [selected, setSelected] = useState([]);
    const containerRef = useRef(null);

    const isItemSelected = (id) => !!selected.find((el) => el === id);

    const handleClick = (id) => {
        const itemSelected = isItemSelected(id);

        setSelected((currentSelected) =>
            itemSelected
                ? currentSelected.filter((el) => el !== id)
                : [...currentSelected, id],
        );
    };

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -200, // Adjust this value as needed
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: 200, // Adjust this value as needed
                behavior: 'smooth'
            });
        }
    };

  if(data != null && data.length != 0) {
    return (
        <div className={styles.cardFilter}>
            <div onClick={scrollLeft} className={styles.arrow}>
                <img src='/chevronbackward.svg' alt='' />
            </div>
            <div className={styles.filters} ref={containerRef}>
                {data.map(({ id, title, icon, index }) => (
                    <div key={index}
                    onClick={()=>handleClick(id)}
                    className={isItemSelected(id) ? styles.cardSelected : styles.card}
                    tabIndex={0}
                    >
                        <img className={styles.cardImage} src={icon} alt={title} />
                        <h3 className={styles.cardTitle}>{title}</h3>
                    </div>
                ))}
            </div>
            <div onClick={scrollRight} className={styles.arrow}>
                <img src='/chevronforward.svg' alt='' />
            </div>
        </div>
      )
  }
}

export default CardFilter
