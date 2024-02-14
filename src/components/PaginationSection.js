import styles from "./PaginationSection.module.css";
import PaginationButton from "./PaginationButton";

const PaginationSection = ({ totalPages, currentPage, onPageChange }) => {
    const goToPreviousPage = () => {
        onPageChange(currentPage - 1);
    };
    const goToNextPage = () => {
        onPageChange(currentPage + 1);
    };
    
  return (
    <div className={styles.backwardarrowsParent}>
      <div className={styles.backwardarrows}>
        <img className={styles.firstPage1Icon} alt="" src="/firstpage.svg" />
        <img
          className={styles.firstPage1Icon}
          alt=""
          src="/chevronbackward.svg"
          onClick={goToPreviousPage}
          
        />
      </div>
      {[...Array(totalPages).keys()].map((pageNumber) => (
        <PaginationButton
            key={pageNumber}
            pageNumber={pageNumber + 1}
            onClick={() => onPageChange(pageNumber + 1)}
            isActive={currentPage === pageNumber + 1}
        />
      ))}
      <div className={styles.backwardarrows}>
        <img
          className={styles.firstPage1Icon}
          alt=""
          src="/chevronforward.svg"
        />
        <img className={styles.firstPage1Icon} alt="" src="/lastlast.svg" />
      </div>
    </div>
  );
};

export default PaginationSection;