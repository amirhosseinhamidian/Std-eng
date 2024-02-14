import { useState, useCallback } from "react";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import PortalDrawer from "../components/PortalDrawer";
import styles from "./SearchResultPage.module.css";
import { useLocation } from 'react-router-dom';
import SliderComponent from "../components/SearchResultSlider";
import SearchSection from "../components/SearchSection";

const SearchResultPage = () => {
  console.clear()
  const location = useLocation();
  const searchData = location.state?.searchData || null;
  console.log(searchData)
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
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  return (
    <>
      <div className={styles.searchresultpage}>
        <Header/>
        <SearchSection/>
        <ul>
          {searchData.map((result) =>(
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