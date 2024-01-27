import { useState, useCallback } from "react";
import Drawer from "../components/Drawer";
import PortalDrawer from "../components/PortalDrawer";
import styles from "./SearchResultPage.module.css";

const SearchResultPage = () => {
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
        <div className={styles.searchresultpageInner}>
          <section className={styles.publishercoverParent}>
            <img
              className={styles.publishercoverIcon}
              alt=""
              src="/publisher-cover@2x.png"
            />
            <section className={styles.titleParent}>
              <b className={styles.title}>Title</b>
              <div className={styles.search}>Designation: D 3951 – 98</div>
              <div className={styles.leftArrowParent}>
                <img
                  className={styles.leftArrowIcon}
                  alt=""
                  src="/xmlid-222.svg"
                />
                <div className={styles.pageParent}>
                  <b className={styles.search}>PAGE: 5</b>
                  <span className={styles.result}>
                    <span>{`There is no one who loves pain itself, who seeks after `}</span>
                    <span className={styles.keyword}>keyword</span>
                    <span>
                      {" "}
                      and wants to have it, simply because it is pain fdsfdsfadf
                      dsafdsfdsfdsfadfsdfdsfdsaf dsafdsfsadf fdafdsfadsffaf a fs
                      dfadsfasfsdf fdsafdsf fdafds dsafdsf dsfdsaf
                    </span>
                  </span>
                </div>
                <img
                  className={styles.rightArrowIcon}
                  alt=""
                  src="/xmlid-2221.svg"
                />
              </div>
              <div className={styles.ellipseParent}>
                <div className={styles.frameChild} />
                <div className={styles.frameChild} />
                <div className={styles.frameChild} />
              </div>
            </section>
          </section>
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
    </>
  );
};

export default SearchResultPage;
