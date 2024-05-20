import Header from "../components/MainHeader";
import Information from "../components/Information";
import Subscription from "../components/Subscription";
import SearchHistory from "../components/SearchHistory";
import ConversationHistory from "../components/ConversationHistory";
import styles from "./ProfilePage.module.css";
import React, { useState } from "react";
import Option from "../components/ui/Option";

const ProfilePage = () => {
  const [selectedOption, setSelectedOption] = useState("information");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.profilepage}>
      <Header />
      <div className={styles.profilepageChild} />
      <div className={styles.optionsSelector}>
        <Option
          optionText="Information"
          isActive={selectedOption === "information"}
          onSelect={() => handleOptionClick("information")}
        />
        <Option
          optionText="Subscription"
          isActive={selectedOption === "subscription"}
          onSelect={() => handleOptionClick("subscription")}
        />
        <Option
          optionText="Search History"
          isActive={selectedOption === "searchHistory"}
          onSelect={() => handleOptionClick("searchHistory")}
        />
        <Option
          optionText="Chat History"
          isActive={selectedOption === "conversationHistory"}
          onSelect={() => handleOptionClick("conversationHistory")}
        />
      </div>
      {selectedOption === "information" && <Information />}
      {selectedOption === "subscription" && <Subscription />}
      {selectedOption === "searchHistory" && <SearchHistory />}
      {selectedOption === "conversationHistory" && <ConversationHistory />}
    </div>
  );
};

export default ProfilePage;