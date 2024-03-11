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
import {searchStandard} from '../services/apiService.js'
import LoadingModal from "../components/ui/LoadingModal";

const API_BASE_URL = "http://172.23.50.114:8060"

const SearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, totalPages, itemsPerPage, searchText, selectedPublisher } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState(data.data);
  const [keyword, setKeyword] = useState(searchText || '');
  const [publisherId,setPubliserId] = useState(selectedPublisher || null);
  const [isLoading, setIsLoading] = useState(false);
  // Pagination click handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
    handlePageChangeData(page);
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
  
  const refreshSearchResults = (data, searchKey, publisher_Id) => {
    // Update the search results data with the new data
    setResults(data);
    setKeyword(searchKey);
    setPubliserId(publisher_Id);
  };

  const handlePageChangeData = async(page) => {
    try {
      setIsLoading(true);
      const data = await searchStandard(keyword,publisherId,page);
      setIsLoading(false);
      refreshSearchResults(data.data, keyword, publisherId);
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>
      <div className={styles.searchresultpage}>
        <Header/>
        <SearchSection context="results" keyword={searchText} publisherId={publisherId} refreshSearchResults={refreshSearchResults}/>
        {isLoading && <LoadingModal/>}
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