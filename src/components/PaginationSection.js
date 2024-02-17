import styles from "./PaginationSection.module.css";
import PaginationButton from "./PaginationButton";
import  calculatePageRange  from "../utils/PaginationUtils";

const PaginationSection = ({ totalPages, currentPage, onPageChange }) => {
    const goToPreviousPage = () => {
        onPageChange(currentPage - 1);
    };
    const goToNextPage = () => {
        onPageChange(currentPage + 1);
    };
    const goToFirstPage = () => {
      onPageChange(1)
    }
    const goToLastPage = () => {
      onPageChange(totalPages)
    }
     // Calculate the range of page numbers to display
     const pagesToShow = calculatePageRange(currentPage, totalPages);
    
  return (
    <div className={styles.backwardarrowsParent}>
      <div className={styles.backwardarrows}>
        <button
         className={styles.transparntButton}
         onClick={goToFirstPage}
         aria-label="First Page"
         disabled={currentPage === 1}>
          <img className={styles.firstPage1Icon} alt="" src="/firstpage.svg" />
        </button>
        <button
          className={styles.transparntButton}
          onClick={goToPreviousPage}
          aria-label="Previous Page"
          disabled={currentPage === 1}>
          <img
            className={styles.firstPage1Icon}
            alt=""
            src="/chevronbackward.svg"
          />
        </button>
      </div>
      {pagesToShow.map((pageNumber) => (
        <PaginationButton
            key={pageNumber}
            pageNumber={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            isActive={currentPage === pageNumber}
        />
      ))}
      <div className={styles.backwardarrows}>
        <button
          className={styles.transparntButton}
          onClick={goToNextPage}
          aria-label="Next Page"
          disabled={currentPage === totalPages}>
          <img
            className={styles.firstPage1Icon}
            alt=""
            src="/chevronforward.svg"
          />
        </button>
        <button
          className={styles.transparntButton}
          onClick={goToLastPage}
          aria-label="Last Page"
          disabled={currentPage === totalPages}>
          <img className={styles.firstPage1Icon} alt="" src="/lastlast.svg" />
        </button>
      </div>
    </div>
  );
};

export default PaginationSection;