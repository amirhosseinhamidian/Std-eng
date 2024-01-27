import { useCallback } from "react";
import styles from "./SearchSection.module.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchSection = () => {
  const onSearchButtonClick = useCallback(() => {
    // Please sync "search result" to the project
  }, []);
  const [searchText, setSearchText] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Check if searchText is not empty before making the request
    if (searchText.trim() !== '') {
      // Log the request data before making the actual API call
      console.log('Request Data:', { searchText, selectedPublisher });
      // Make a request to the server using Axios
      // TODO: Add search endpoint
      // axios.post('/api/search', {
      //   searchText,
      //   selectedPublisher,
      // })
      // .then(response => {
      //   // Handle the response from the server
      //   console.log('Server response:', response.data);
      //   // Navigate to the SearchResults page and pass data using state
      //   navigate('/search-results', { state: { searchData: response.data } });
      // })
      // .catch(error => {
      //   // Handle errors
      //   console.error('Error making request:', error);
      // });

      navigate('./searchresultpage');
    } else {
        // Handle case where searchText is empty
      console.warn('Please enter a search text before searching.');
    }
  };

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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <select className={styles.publisherdropdown}
          value={selectedPublisher}
          onChange={(e) => setSelectedPublisher(e.target.value)}
        >
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
        onClick={handleSearch}
      >
        <b className={styles.search}>Search</b>
      </button>
    </section>
  );
};

export default SearchSection;
