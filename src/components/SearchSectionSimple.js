import styles from "./SearchSectionSimple.module.css";
import { useState } from "react";
import LoadingModal from "../components/ui/LoadingModal"
import { useSearchStandard } from "../services/apiService";

const SearchSectionSimple = ( { onFilterButtonClick, ...props } ) => {
    const [searchText, setSearchText] = useState(props.keyword || '');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPublisher, setSelectedPublisher] = useState('All publisher');

    const handleSearch = async() => {
        // Check if searchText is not empty before making the request
        if (!searchText.trim()) {
          return
        } 
        try{
          setError(null);
          setIsLoading(true);
          const data = useSearchStandard(searchText);
          setIsLoading(false);
          const totalPages = data.data.last_page;
          const itemsPerPage = data.data.per_page;
          props.refreshSearchResults(data.data, searchText, selectedPublisher);
          
        } catch (error) {
           // Check if the error is a 401 authorization error
          if (error.response && error.response.status === 401) {
            // Redirect the user to the login page
            setIsLoading(false);
          } else {
           // Handle other errors
            console.error('Error searching:', error);
          }
        } finally {
          setIsLoading(false);
        }
    };

    const handleFilterClick = () => {
      onFilterButtonClick();
    }

    return (
      <>
        {isLoading && <LoadingModal/>}
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