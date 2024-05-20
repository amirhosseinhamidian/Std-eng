import React from "react";
import styles from "./PaginatoinButton.module.css"

const PaginationButton = ({ pageNumber, onClick, isActive }) => {
  return (
    <button onClick={onClick} disabled={isActive} className={isActive ? styles.active : styles.normal}>
      {pageNumber}
    </button>
  );
};

export default PaginationButton;