import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchStandard } from '../services/apiService';
import LoadingModal from '../components/ui/LoadingModal';
import LoadingReminderModal from '../components/ui/LoginReminderModal.js';
import { Select, MenuItem } from '@mui/material';
import styles from './SearchSection.module.css';
import { isUserLogin } from '../services/authService.js';
import SearchContext from '../contexts/SearchContext';

const SearchSection = () => {
  const {
    searchText,
    setSearchText,
    selectedPublisher,
    setSelectedPublisher,
    isFilterLoading,
    filterError,
    publishers
  } = useContext(SearchContext);
  const navigate = useNavigate();
  const [goToLoginPage, setGoToLoginPage] = useState(false);
  const [isSearching, setIsSearching] = useState(false);


  const handleSearch = async () => {
    if (!searchText.trim()) {
      return;
    }

    if (isUserLogin()) {
      console.log(searchText)
      navigate('./searchresultpage')
    } else {
      setGoToLoginPage(true)
    }

  };

  useEffect(() => {
    if (filterError) {
      console.error('Error fetching publishers:', filterError);
    }
  }, [filterError]);

  return (
    <section className={styles.searchSection}>
      {isFilterLoading && <LoadingModal />}
      {goToLoginPage && <LoadingReminderModal afterLoginPath="/searchresultpage"/>}
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
        {publishers && (
          <Select
            className={styles.publisherdropdown}
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
          >
            <MenuItem value="All publisher">All publisher</MenuItem>
            {publishers.map((publisher) => (
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
