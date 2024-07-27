import React, { useContext, useRef } from 'react'
import SearchContext from '../../contexts/SearchContext';
import styles from "./CardFilter.module.css";

const CardFilter = () => {
    
    const { 
        selectedDisciplines,
        setSelectedDisciplines, 
        disciplines
    } = useContext(SearchContext);
    const containerRef = useRef(null);

    const isItemSelected = (id) => !!selectedDisciplines.find((el) => el === id);

    const handleClick = (id) => {
        const itemSelected = isItemSelected(id);

        setSelectedDisciplines((currentSelected) =>
            itemSelected
                ? currentSelected.filter((el) => el !== id)
                : [...currentSelected, id],
        );
    };

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -200,
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

  if(disciplines != null && disciplines.length != 0) {
    return (
        <div className={styles.cardFilter}>
            <div onClick={scrollLeft} className={styles.arrow}>
                <img src='/chevronbackward.svg' alt='' />
            </div>
            <div className={styles.filters} ref={containerRef}>
                {disciplines.map((discipline, index) => (
                    <div key={index}
                    onClick={()=>handleClick(discipline.id)}
                    className={isItemSelected(discipline.id) ? styles.cardSelected : styles.card}
                    tabIndex={0}
                    >
                        <img className={styles.cardImage} src={discipline.icon} alt={discipline.title} />
                        <h3 className={styles.cardTitle}>{discipline.title}</h3>
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
