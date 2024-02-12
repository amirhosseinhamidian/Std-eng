import { useCallback } from "react";
import MainHeader from "../components/MainHeader";
import styles from "./SearchResultPage.module.css";

const SearchResultPage = () => {
  const onSearchButtonClick = useCallback(() => {
    // Please sync "search result" to the project
  }, []);

  return (
    <div className={styles.searchresultpage}>
      <MainHeader naveFlex="unset" naveAlignSelf="stretch" />
      <div className={styles.searchSectionWrapper}>
        <section className={styles.searchSection}>
          <div className={styles.frameParent}>
            <div className={styles.searchiconParent}>
              <img className={styles.searchicon} alt="" src="/searchicon.svg" />
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
            <b className={styles.search}>Search</b>
          </button>
        </section>
      </div>
      <div className={styles.searchresultpageInner}>
        <section className={styles.frameGroup}>
          <div className={styles.publishercoverParent}>
            <img
              className={styles.publishercoverIcon}
              alt=""
              src="/publisher-cover@2x.png"
            />
            <section className={styles.titleParent}>
              <b className={styles.title}>Title</b>
              <div className={styles.stdcode}>Designation: D 3951 – 98</div>
              <div className={styles.slider}>
                <b className={styles.stdcode}>PAGE: 5</b>
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
            </section>
          </div>
          <div className={styles.frameChild} />
        </section>
      </div>
    </div>
  );
};

export default SearchResultPage;
