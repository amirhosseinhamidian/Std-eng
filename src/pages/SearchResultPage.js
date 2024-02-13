import { useState, useCallback } from "react";
import Drawer from "../components/Drawer";
import PortalDrawer from "../components/PortalDrawer";
import styles from "./SearchResultPage.module.css";
import { useLocation } from 'react-router-dom';
import SliderComponent from "../components/SearchResultSlider";

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
        <nav className={styles.naving}>
          <div className={styles.nave}>
            <div className={styles.logoName}>
              <img
                className={styles.logoNameChild}
                alt=""
                src="/ellipse-1.svg"
              />
              <b className={styles.standardEngineering}>standard engineering</b>
            </div>
            <div className={styles.frameParent}>
              <button className={styles.priceWrapper} id="pirceBtn">
                <b className={styles.price}>Price</b>
              </button>
              <div className={styles.headerMenu}>
                <nav className={styles.links}>
                  <a className={styles.home} muted>
                    Home
                  </a>
                  <b className={styles.search}>Search</b>
                  <b className={styles.search}>Standards</b>
                  <b className={styles.search}>About us</b>
                  <b className={styles.search}>Profile</b>
                </nav>
                <button className={styles.image7} onClick={openDrawer} />
              </div>
            </div>
          </div>
        </nav>
        <div className={styles.searchSectionWrapper}>
          <section className={styles.searchSection}>
            <div className={styles.frameGroup}>
              <div className={styles.searchiconParent}>
                <img
                  className={styles.searchicon}
                  alt=""
                  src="/searchicon.svg"
                />
                <input
                  className={styles.textinput}
                  id="searchKeyword"
                  placeholder="Type Keyword"
                  type="text"
                />
              </div>
              <select className={styles.publisherdropdown}>
                <option value="All publisher">All publisher</option>
                <option value="ASTM">ASTM</option>
                <option value="AWS">AWS</option>
                <option value="DPI">DPI</option>
                <option value="ISO">ISO</option>
                <option value="ISP">ISP</option>
              </select>
            </div>
            <button
              className={styles.searchbutton}
              id="searchBtn"
              onClick={onSearchButtonClick}
            >
              <b className={styles.search1}>Search</b>
            </button>
          </section>
        </div>
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