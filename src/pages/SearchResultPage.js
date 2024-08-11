import { useState, useCallback, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import PortalDrawer from "../components/PortalDrawer";
import SliderComponent from "../components/SearchResultSlider";
import SearchSectionSimple from "../components/SearchSectionSimple";
import Pagination from "../components/PaginationSection";
import LoadingModal from "../components/ui/LoadingModal";
import SidebarFilter from "../components/filter sidebar/SidebarFilter";
import { BottomSheet } from "react-spring-bottom-sheet";
import SearchContext from "../contexts/SearchContext";
import { useSearchStandard, searchStandard } from "../services/apiService";
import styles from "./SearchResultPage.module.css";

const API_BASE_URL = "http://std-eng.ir:8000/";

const SearchResultPage = () => {
  const {
    searchText,
    setSearchText,
    selectedPublisher,
    setSelectedPublisher,
    categories,
    documentType,
    region,
    year,
    currentPage,
    setCurrentPage,
    keyword,
    setKeyword,
  } = useContext(SearchContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isNewSearch, setIsNewSearch] = useState(false);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const savedSearchText = queryParams.get("searchText");
    const savedPublisher = queryParams.get("selectedPublisher");
    // Get other query params similarly

    if (savedSearchText) {
      console.log("search text :  ", savedSearchText);
      setSearchText(savedSearchText);
    }
    if (savedPublisher) {
      setSelectedPublisher(savedPublisher);
    }
    // Set other states similarly

    setIsInitialized(true); // Set this after initializing state
  }, []);

  useEffect(() => {
    if (
      isInitialized &&
      (searchText || selectedPublisher) /* || other states */
    ) {
      const queryParams = new URLSearchParams();
      console.log("search set text :  ", searchText);
      if (searchText) {
        queryParams.set("searchText", searchText);
      }
      if (selectedPublisher) {
        queryParams.set("selectedPublisher", selectedPublisher);
      }
      // Set other query params similarly

      window.history.replaceState(null, null, `?${queryParams.toString()}`);
    }
  }, [searchText, selectedPublisher, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return; // Prevent fetching until state is initialized
    setIsNewSearch(false);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setKeyword(searchText);
        console.log(searchText);
        const data = await searchStandard(
          searchText,
          selectedPublisher,
          currentPage,
          categories,
          documentType,
          region,
          year
        );
        if (data) {
          console.log("data: ", data);
          setResults(data.data);
          setTotalPages(data.last_page);
        }
      } catch (error) {
        setSearchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, isNewSearch, isInitialized]);

  useEffect(() => {
    console.log("use effect current page");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const getUrlLogo = (suffix) => {
    return API_BASE_URL + "storage/publisher-logo/" + suffix;
  };

  const pdfClickHandle = (pdfUrl) => {
    const url = API_BASE_URL + "storage/" + pdfUrl;
    console.log(url);
    navigate("./standarddetailpage", { state: { url } });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
        {!isLoading && (
          <div className={styles.container}>
            <div className={styles.sidebar}>
              <SidebarFilter />
              <button
                className={styles.applyBtn}
                onClick={() => setIsNewSearch(true)}
              >
                Apply
              </button>
            </div>
            <div className={styles.mainContent}>
              <div className={styles.searchSection}>
                <SearchSectionSimple
                  onFilterButtonClick={handleFilterButtonClick}
                  submitNewSearch={setIsNewSearch}
                />
              </div>
              <ul className={styles.listContent}>
                {results &&
                  results.map((result, index) => (
                    <li key={index}>
                      <section className={styles.frameContainer}>
                        <div className={styles.nave}>
                          <img
                            className={styles.publishercoverIcon}
                            alt={result.title}
                            src={getUrlLogo(result.publisher_logo)}
                            onClick={() => pdfClickHandle(result.pdf_path)}
                          />
                          <section className={styles.titleParent}>
                            <b
                              className={styles.title}
                              onClick={() => pdfClickHandle(result.pdf_path)}
                            >
                              {result.title}
                            </b>
                            {result.designation_id && (
                              <div className={styles.designation}>
                                Designation: {result.designation_id}
                              </div>
                            )}
                            <SliderComponent
                              details={result.details}
                              keyword={keyword}
                            />
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
        )}
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
        blocking={true}
        footer={
          <div className={styles.sheetBtns}>
            <button
              className={styles.applyBottomSheetBtn}
              onClick={() => {
                setIsNewSearch(true);
                handleCloseBottomSheet();
              }}
            >
              Apply
            </button>
            <button
              className={styles.closeBtn}
              onClick={handleCloseBottomSheet}
            >
              Close
            </button>
          </div>
        }
      >
        <div className={styles.bottomSheetContent}>
          <div className={styles.filterContainer}>
            <SidebarFilter />
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default SearchResultPage;
