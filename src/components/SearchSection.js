import { useCallback } from "react";
import styles from "./SearchSection.module.css";

const SearchSection = () => {
  const onSearchButtonClick = useCallback(() => {
    // Please sync "search result" to the project
  }, []);

  return (
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
  );
};

export default SearchSection;
