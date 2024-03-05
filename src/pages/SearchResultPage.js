import { useState, useCallback, useEffect } from "react";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import PortalDrawer from "../components/PortalDrawer";
import styles from "./SearchResultPage.module.css";
import { useLocation } from 'react-router-dom';
import SliderComponent from "../components/SearchResultSlider";
import SearchSection from "../components/SearchSection";
import Pagination from "../components/PaginationSection";
import { useNavigate } from 'react-router-dom';
import { pdf } from "@react-pdf/renderer";

const API_BASE_URL = "http://192.168.100.118:8060"

const SearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, totalPages, itemsPerPage, searchText } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState(data);
  const [keyword, setKeyword] = useState(searchText || '');
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

  const pdfClickHandle = (pdfUrl) => {
    const url = API_BASE_URL + pdfUrl
    navigate('./standarddetailpage', { state: {url }});
  }
  
  const refreshSearchResults = (newData, searchKey) => {
    // Update the search results data with the new data
    setResults(newData);
    setKeyword(searchKey);
  };


  return (
    <>
      <div className={styles.searchresultpage}>
        <Header/>
        <SearchSection context="results" keyword={searchText} refreshSearchResults={refreshSearchResults}/>
        <ul className={styles.mainContent}>
          {results.data.map((result) =>(
            <li key={result.content_id}>
               <div className={styles.searchresultpageInner}>
                <section className={styles.frameContainer}>
                  <div className={styles.nave}>
                    <img
                      className={styles.publishercoverIcon}
                      alt={result.title}
                      src={API_BASE_URL + result.publisher_logo}
                      onClick={() => pdfClickHandle(result.pdf_path)}
                    />
                    <section className={styles.titleParent}>
                      <b className={styles.title}>{result.title}</b>
                      <div className={styles.designation}>Designation: {result.designation_id}</div>
                      <SliderComponent details={result.details} keyword={keyword} />
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