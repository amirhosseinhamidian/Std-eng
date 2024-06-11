import { useState, useCallback, useEffect } from "react";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import PortalDrawer from "../components/PortalDrawer";
import styles from "./SearchResultPage.module.css";
import { useLocation } from 'react-router-dom';
import SliderComponent from "../components/SearchResultSlider";
import SearchSectionSimple from "../components/SearchSectionSimple.js";
import Pagination from "../components/PaginationSection";
import { useNavigate } from 'react-router-dom';
import {useSearchStandard} from '../services/apiService.js'
import LoadingModal from "../components/ui/LoadingModal";
import SidebarFilter from "../components/filter sidebar/SidebarFilter.js";
import { BottomSheet } from 'react-spring-bottom-sheet'

const API_BASE_URL = "http://std-eng.ir:8000/"

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
      const data = useSearchStandard(keyword,publisherId,page);
      setIsLoading(false);
      refreshSearchResults(data.data, keyword, publisherId);
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const handleFilterButtonClick = () => {
    setIsFilterSheetOpen(!isFilterSheetOpen);
  };

  const handleCloseBottomSheet = () => {
    setIsFilterSheetOpen(false);
  };
  
  return (
    <>
      <div className={styles.searchresultpage}>
        <Header />
        {isLoading && <LoadingModal />}
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <SidebarFilter />
            <button className={styles.applyBtn}>Apply</button>
          </div>
          <div className={styles.mainContent}>
            <div className={styles.searchSection}>
              <SearchSectionSimple 
                onFilterButtonClick={handleFilterButtonClick}
                keyword={searchText} 
                publisherId={publisherId} 
                refreshSearchResults={refreshSearchResults}
              />
            </div>
            <ul className={styles.listContent}>
              {results.data.map((result, index) => (
                <li key={index}>
                  <section className={styles.frameContainer}>
                      <div className={styles.nave}>
                        <img
                          className={styles.publishercoverIcon}
                          alt={result.title}
                          // src={API_BASE_URL + result.publisher_logo}
                          src="./PDF_icon.png"
                          onError={(e) => {
                            e.target.src = "./PDF_icon.png"; // Set the placeholder image URL
                          }}
                          onClick={() => pdfClickHandle(result.pdf_path)}
                        />
                        <section className={styles.titleParent}>
                          <b className={styles.title}>{result.title}</b>
                          <div className={styles.designation}>Designation: {result.designation_id}</div>
                          <SliderComponent details={result.details} keyword={keyword} />
                        </section>
                      </div>
                    </section>
                    <hr className={styles.frameChild} />
                </li>
              ))}
            </ul>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>        
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
        <BottomSheet 
          open={isFilterSheetOpen} 
          blocking={true} >
          <div className={styles.bottomSheetContent}>
                      
            <div className={styles.filterContainer}>
            
              <SidebarFilter />
              <div className={styles.sheetBtns}>
                <button className={styles.applyBottomSheetBtn}>Apply</button>
                <button className={styles.closeBtn} onClick={handleCloseBottomSheet}>Close</button>
              </div>
            </div>
          </div>
        </BottomSheet>
    </>
  );
};

export default SearchResultPage;