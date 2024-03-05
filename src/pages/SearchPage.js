import Header from "../components/Header";
import ToggleMode from "../components/ToggleMode";
import SearchSection from "../components/SearchSection";
import ChatbotSection from "../components/ChatbotSection";
import styles from "./SearchPage.module.css";
import React, { useState } from 'react';

const SearchPage = () => {
  const [mode, setMode] = useState('search');
  
  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    console.log("here")
  };

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
        
        {mode === 'search' && <SearchSection context="main"/>}
        {mode === 'chatbot' && <ChatbotSection />}
        
      </div>
    </div>
  );
};

export default SearchPage;
