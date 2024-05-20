import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import styles from "./CardFilter.module.css";

function CardFilter({ data }) {
    const [selected, setSelected] = React.useState([]);

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
        <div className={styles.cardContainer}>
            <ScrollMenu>
                {data.map(({ id, title, icon }) => (
                    <Card
                        itemId={id}
                        title={title}
                        icon={icon}
                        key={id}
                        onClick={() => handleClick(id)}
                        selected={isItemSelected(id)}
                    />
                ))}
            </ScrollMenu>
        </div>
    );
}

export function LeftArrow() {
    const visibility = React.useContext(VisibilityContext);
    const isFirstItemVisible = visibility.useIsVisible("first", true);
  
    return (
      <Arrow
        disabled={isFirstItemVisible}
        onClick={() => visibility.scrollPrev()}
      >
        Left
      </Arrow>
    );
  }
  
  export function RightArrow() {
    const visibility = React.useContext(VisibilityContext);
    const isLastItemVisible = visibility.useIsVisible("last", false);
  
    return (
      <Arrow disabled={isLastItemVisible} onClick={() => visibility.scrollNext()}>
        Right
      </Arrow>
    );
  }

function Arrow(props) {
    const { children, disabled, onClick } = props;
    
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          right: "1%",
          userSelect: "none",
        }}
      >
        {children}
      </button>
    );
  }

function Card({ onClick, selected, title, icon, itemId }) {
    const visibility = React.useContext(VisibilityContext);
    const visible = visibility.useIsVisible(itemId, true);

    return (
        <div
            onClick={onClick}
            className={selected ? styles.cardSelected : styles.card}
            tabIndex={0}
        >
            <img className={styles.cardImage} src={icon} alt={title} />
            <h3 className={styles.cardTitle}>{title}</h3>
        </div>
    );
}

export default CardFilter;