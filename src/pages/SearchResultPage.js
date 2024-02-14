import { useState, useCallback, useEffect } from "react";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import PortalDrawer from "../components/PortalDrawer";
import styles from "./SearchResultPage.module.css";
import { useLocation } from 'react-router-dom';
import SliderComponent from "../components/SearchResultSlider";
import SearchSection from "../components/SearchSection";
import Pagination from "../components/PaginationSection";

const SearchResultPage = () => {
  console.clear()
  const location = useLocation();
  const { mockData, totalPages, itemsPerPage } = location.state || {};;
  console.log(mockData)

  const [currentPage, setCurrentPage] = useState(1);
  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, mockData.length);
  // Slice data for current page
  const currentPageData = mockData[currentPage - 1];
  // Pagination click handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const onSearchButtonClick = useCallback(() => {
    // Please sync "search result" to the project
  }, []);

  return (
    <>
      <div className={styles.searchresultpage}>
        <Header/>
        <SearchSection/>
        <ul className={styles.mainContent}>
          {currentPageData.map((result) =>(
            <li key={result.id}>
               <div className={styles.searchresultpageInner}>
                <section className={styles.frameContainer}>
                  <div className={styles.nave}>
                    <img
                      className={styles.publishercoverIcon}
                      alt={result.title}
                      src={result.coverPhoto}
                    />
                    <section className={styles.titleParent}>
                      <b className={styles.title}>{result.title}</b>
                      <div className={styles.designation}>Designation: {result.designation}</div>
                      <SliderComponent details={result.details} />
                    </section>
                  </div>
                  <div className={styles.frameChild} />
                </section>
              </div>
            </li>
          ))}
        </ul>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      {isDrawerOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Right"
          onOutsideClick={closeDrawer}
        >
          <Drawer onClose={closeDrawer} />
        </PortalDrawer>
      )}
    </>
  );
};

export default SearchResultPage;