import Header from "../components/Header";
import ToggleMode from "../components/ToggleMode";
import SearchSection from "../components/SearchSection";
import ChatbotSection from "../components/ChatbotSection";
import styles from "./SearchPage.module.css";
import React, { useState } from 'react';
import CardFilter from "../components/card filter/CardFilter";
import CardFilter2 from "../components/card filter/CardFilter2";

const SearchPage = () => {
  const [mode, setMode] = useState('search');
  
  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  const cardData = [
    {id: 1, title: 'Discipline 1', icon: '/theodolite.png' },
    {id: 2, title: 'Discipline 2', icon: '/theodolite.png' },
    {id: 3, title: 'Discipline 3', icon: '/theodolite.png' },
    {id: 4, title: 'Discipline 1', icon: '/theodolite.png' },
    {id: 5, title: 'Discipline 2', icon: '/theodolite.png' },
    {id: 6, title: 'Discipline 3', icon: '/theodolite.png' },
    {id: 7, title: 'Discipline 1', icon: '/theodolite.png' },
    {id: 8, title: 'Discipline 2', icon: '/theodolite.png' },
    {id: 9, title: 'Discipline 3', icon: '/theodolite.png' },
    {id: 10, title: 'Discipline 1', icon: '/theodolite.png' },
    {id: 11, title: 'Discipline 2', icon: '/theodolite.png' },
    {id: 12, title: 'Discipline 3', icon: '/theodolite.png' },
    {id: 13, title: 'Discipline 1', icon: '/theodolite.png' },
    {id: 14, title: 'Discipline 2', icon: '/theodolite.png' },
    {id: 15, title: 'Discipline 3', icon: '/theodolite.png' },
    {id: 16, title: 'Discipline 1', icon: '/theodolite.png' },
    {id: 17, title: 'Discipline 2', icon: '/theodolite.png' },
    {id: 18, title: 'Discipline 3', icon: '/theodolite.png' },
    {id: 19, title: 'Discipline 1', icon: '/theodolite.png' },
    {id: 20, title: 'Discipline 2', icon: '/theodolite.png' },
    {id: 21, title: 'Discipline 3', icon: '/theodolite.png' },
    {id: 22, title: 'Discipline 1', icon: '/theodolite.png' },
    {id: 23, title: 'Discipline 2', icon: '/theodolite.png' },
    {id: 24, title: 'Discipline 3', icon: '/theodolite.png' },
    // Add more card data as needed
  ];

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
        
        {mode === 'search' && <SearchSection context="main" keyword=""/>}
        {mode === 'chatbot' && <ChatbotSection />}
        <div className={styles.moreFilterDiv}>
          <hr className={styles.horizontalLine} />
          <p className={styles.morefilter}>discipline filters</p>
          <hr className={styles.horizontalLine} />
        </div>

        <CardFilter2 data={cardData}/>
        
      </div>
    </div>
  );
};

export default SearchPage;
