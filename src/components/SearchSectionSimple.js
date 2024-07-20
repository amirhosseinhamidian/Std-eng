import styles from "./SearchSectionSimple.module.css";
import { useContext, useState } from "react";
import LoadingModal from "../components/ui/LoadingModal"
import { useSearchStandard } from "../services/apiService";
import SearchContext from "../contexts/SearchContext";

const SearchSectionSimple = ( { onFilterButtonClick, ...props} ) => {
    
  const {
    searchText,
    setSearchText
  } = useContext(SearchContext);


    const handleSearch = () => {
      props.submitNewSearch(true);
    };

    const handleFilterClick = () => {
      onFilterButtonClick();
    }

    return (
      <>
        <section className={styles.searchSection}>
          <div className={styles.frameParent}>
            <div className={styles.filterHolder} onClick={handleFilterClick}>
              <img src="/filter.svg" className={styles.filterIcon}/>
              <div className={styles.filterBtn}>Filters</div>
            </div>
            <div className={styles.searchiconParent}>
              <img className={styles.searchicon} alt="" src="/searchicon.svg" />
              <input
                className={styles.textinput}
                id="searchKeyword"
                placeholder="Type Keyword"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <button
            className={styles.searchbutton}
            id="searchBtn"
            onClick={handleSearch}
          >
            <b className={styles.search}>Search</b>
          </button>
        </section>
      </>
      );
}

export default SearchSectionSimple;