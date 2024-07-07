import Header from "../components/Header";
import ToggleMode from "../components/ToggleMode";
import SearchSection from "../components/SearchSection";
import ChatbotSection from "../components/ChatbotSection";
import styles from "./SearchPage.module.css";
import React, { useState, useEffect } from 'react';
import CardFilter from "../components/card filter/CardFilter";
import { useGetPageFilterData } from "../services/apiService";

const SearchPage = () => {
  const [mode, setMode] = useState('search');
  
  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  const [filters , setFilters] = useState([])
  const [filterError , setFiltersError] = useState(null)
  const [isFilterLoading, setIsFilterLoading] = useState(false)

  const { data, error, isLoading } = useGetPageFilterData('searchHome');
  
  useEffect(() => {
    if (data) {
      setFilters(data.data);
    }
    if (error) {
      setFiltersError(error);
    }
    setIsFilterLoading(isLoading);
  }, [data, error, isLoading]);
  

  return (
    <div className={styles.searchpage}>
      <Header />
      <div className={styles.searchpageChild} />
      <div className={styles.search}>
        <ToggleMode mode={mode} onModeChange={handleModeChange}/>
        {mode === 'search' &&
          <div className={styles.promotiontext}>
            <h2 className={styles.searchInMoreContainer}>
              <span>{`Search in more then 150,000 `}</span>
              <span className={styles.standard}>Standard</span>
              <span> documents</span>
            </h2>
          </div>
        }

        {mode === 'chatbot' &&
          <div className={styles.promotiontext}>
            <h2 className={styles.searchInMoreContainer}>
              <span>{`Ask your Standard question, `}</span>
              <span className={styles.standard}>AI</span>
              <span> answer</span>
            </h2>
          </div>
        }
        
        {mode === 'search' && <SearchSection context="main" keyword="" publishers= {filters.publishers} filterError= {filterError} isFilterLoading={isFilterLoading}/>}
        {mode === 'chatbot' && <ChatbotSection />}
        <div className={styles.moreFilterDiv}>
          <hr className={styles.horizontalLine} />
          <p className={styles.morefilter}>discipline filters</p>
          <hr className={styles.horizontalLine} />
        </div>

        <CardFilter data={filters.disciplines}/>
        
      </div>
    </div>
  );
};

export default SearchPage;
