import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchStandard } from '../services/apiService';
import LoadingModal from '../components/ui/LoadingModal';
import LoadingReminderModal from '../components/ui/LoginReminderModal.js';
import { Select, MenuItem } from '@mui/material';
import styles from './SearchSection.module.css';

const SearchSection = (props) => {
  const [searchText, setSearchText] = useState(props.keyword || '');
  const [selectedPublisher, setSelectedPublisher] = useState('All publisher');
  const navigate = useNavigate();
  const [goToLoginPage, setGoToLoginPage] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const handleSearch = async () => {
    if (!searchText.trim()) {
      return;
    }

    setIsSearching(true); // Set searching state to true
    setSearchError(null); // Clear previous errors

    try {
      const data = await searchStandard(searchText, selectedPublisher);
      setSearchData(data);
      setIsSearching(false);

      // Navigate to search result page with data
      const totalPages = data.last_page;
      const itemsPerPage = data.per_page;
      navigate('./searchresultpage', {
        state: {
          data,
          totalPages,
          itemsPerPage,
          searchText,
          selectedPublisher,
        },
      });
    } catch (error) {
      console.error('Error during search:', error);
      setIsSearching(false);
      setSearchError(error);

      if (error.response && error.response.status === 401) {
        setGoToLoginPage(true);
      }
    }
  };

  useEffect(() => {
    if (props.filterError) {
      console.error('Error fetching publishers:', props.filterError);
    }
  }, [props.filterError]);

  return (
    <section className={styles.searchSection}>
      {props.isFilterLoading && <LoadingModal />}
      {goToLoginPage && <LoadingReminderModal />}
      <div className={styles.frameParent}>
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
        {props.publishers && (
          <Select
            className={styles.publisherdropdown}
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
          >
            <MenuItem value="All publisher">All publisher</MenuItem>
            {props.publishers.map((publisher) => (
              <MenuItem key={publisher.id} value={publisher.id}>
                {publisher.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </div>
      <button
        className={styles.searchbutton}
        id="searchBtn"
        onClick={handleSearch}
        disabled={isSearching} // Disable the button while searching
      >
        <b className={styles.search}>Search</b>
      </button>
    </section>
  );
};

export default SearchSection;
