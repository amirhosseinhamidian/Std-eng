import { useCallback } from "react";
import styles from "./SearchSection.module.css";
import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import generateMockData from '../utils/mockData.js';
import {searchStandard} from '../services/apiService.js'
import LoadingModal from "../components/ui/LoadingModal";
import LoadingReminderModal from "../components/ui/LoginReminderModal.js";

const SearchSection = () => {
  const onSearchButtonClick = useCallback(() => {
    // Please sync "search result" to the project
  }, []);
  const [searchText, setSearchText] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const navigate = useNavigate();
  const [mockData, setMockData] = useState(null);
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [goToLoginPage, setGoToLoginPage] = useState(false);

  const handleSearch = async() => {
    // Check if searchText is not empty before making the request
    
    if (!searchText.trim()) {
      return
    } 
    try{
      // Log the request data before making the actual API call
      // Make a request to the server using Axios
      setLoading(true);
      setError(null);
      setIsLoading(true);
      const data = await searchStandard(searchText);
      setIsLoading(false);
      // const { mockData, totalPages, itemsPerPage } = generateMockData();
      // setMockData(mockData);
      // console.log(mockData)
      console.log("data", data)
      const totalPages = 1;
      const itemsPerPage = 1;
      navigate('./searchresultpage',   { state: { data, totalPages, itemsPerPage }});
    }catch (error) {
       // Check if the error is a 401 authorization error
      if (error.response && error.response.status === 401) {
        // Redirect the user to the login page
        setIsLoading(false)
        setGoToLoginPage(true)
      } else {
       // Handle other errors
        console.error('Error searching:', error);
      }
    }finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.searchSection}>
      {isLoading && <LoadingModal/>}
      {goToLoginPage && <LoadingReminderModal/>}
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
