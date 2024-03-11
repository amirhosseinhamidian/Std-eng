import Header from "../components/MainHeader";
import Information from "../components/Information";
import Subscription from "../components/Subscription";
import SearchHistory from "../components/SearchHistory";
import ConversationHistory from "../components/ConversationHistory";
import styles from "./ProfilePage.module.css";
import React, {useState} from "react";

const ProfilePage = () => {
  const [selectedOption, setSelectedOption] = useState('information')
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className={styles.profilepage}>
      <Header />
      <div className={styles.profilepageChild} />
      <section className={styles.profilepageInner}>
        <div className={styles.frameParent}>
          <div className={styles.informationParent}>
          <a 
            className={`${styles.sidebarOption} ${selectedOption === 'information' ? styles.selected : ''}`} 
            onClick={() => handleOptionClick('information')}
            muted
          >
            Information
          </a>
          <div 
            className={`${styles.sidebarOption} ${selectedOption === 'subscription' ? styles.selected : ''}`} 
            onClick={() => handleOptionClick('subscription')}
          >
            Subscription Plan
          </div>
          <div 
            className={`${styles.sidebarOption} ${selectedOption === 'searchHistory' ? styles.selected : ''}`} 
            onClick={() => handleOptionClick('searchHistory')}
          >
            Search History
          </div>
          <div 
            className={`${styles.sidebarOption} ${selectedOption === 'conversationHistory' ? styles.selected : ''}`}
            onClick={() => handleOptionClick('conversationHistory')}
          >
            Chat History
          </div>
          </div>
          <button className={styles.subscriptionPlan} id="log_out_btn">
            Log Out
          </button>
        </div>
      </section>
      {selectedOption === 'information' && <Information />}
      {selectedOption === 'subscription' && <Subscription />}
      {selectedOption === 'searchHistory' && <SearchHistory />}
      {selectedOption === 'conversationHistory' && <ConversationHistory />}
    </div>
  );
};

export default ProfilePage;
