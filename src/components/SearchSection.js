import { useCallback, useEffect } from "react";
import styles from "./SearchSection.module.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {searchStandard, publisherListRequest} from '../services/apiService.js'
import LoadingModal from "../components/ui/LoadingModal";
import LoadingReminderModal from "../components/ui/LoginReminderModal.js";
import {
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

const SearchSection = ( props ) => {
  const [searchText, setSearchText] = useState(props.keyword || '');
  const [selectedPublisher, setSelectedPublisher] = useState('All publisher');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [goToLoginPage, setGoToLoginPage] = useState(false);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const fetchPublisherData = async () => {
      try {
        // Fetch data using the API service function
        const data = await publisherListRequest();
        // Extract publisher names and IDs from the response
        const publisherData = data.data.map(publisher => ({
          id: publisher.id,
          name: publisher.name,
        }));
        // Set the state with the list of publisher names and IDs
        setPublishers(publisherData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPublisherData(); // Call the fetchData function
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleSearch = async() => {
    // Check if searchText is not empty before making the request
    
    if (!searchText.trim()) {
      return
    } 
    try{
      // Log the request data before making the actual API call
      // Make a request to the server using Axios
      setError(null);
      setIsLoading(true);
      const data = await searchStandard(searchText, selectedPublisher);
      setIsLoading(false);
      const totalPages = data.data.last_page;
      const itemsPerPage = data.data.per_page;
      if (props.context === 'results') {
        // If the component is on the search results page, update the search results data
        refreshSearchResults(data, searchText, selectedPublisher);
      } else {
        // Otherwise, navigate to the search results page with the new data
        navigate('./searchresultpage', { state: { data, totalPages, itemsPerPage, searchText, selectedPublisher }});
      }
      
    } catch (error) {
       // Check if the error is a 401 authorization error
      if (error.response && error.response.status === 401) {
        // Redirect the user to the login page
        setIsLoading(false);
        setGoToLoginPage(true);
      } else {
       // Handle other errors
        console.error('Error searching:', error);
      }
    } finally {
      setIsLoading(false);
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
        <Select className={styles.publisherdropdown}
          value={selectedPublisher}
          onChange={(e) => setSelectedPublisher(e.target.value)}
        >
          <MenuItem value="All publisher">All publisher</MenuItem>
          {/* Map over the publishers array to create options dynamically */}
          {publishers.map((publisher, index) => (
            <MenuItem key={index} value={publisher.id}>
              {publisher.name}
            </MenuItem>
      ))}
        </Select>
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
