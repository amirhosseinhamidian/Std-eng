import Header from "../components/Header";
import ToggleMode from "../components/ToggleMode";
import SearchSection from "../components/SearchSection";
import ChatbotSection from "../components/ChatbotSection";
import styles from "./SearchPage.module.css";
import React, { useState, useEffect, useCallback, useContext } from "react";
import CardFilter from "../components/card filter/CardFilter";
import { useGetPageFilterData } from "../services/apiService";
import SearchContext, { SearchProvider } from "../contexts/SearchContext";

const SearchPage = () => {
  const disciplinesFilter = [
    {
      id: 1,
      title: "Mathematics",
      icon: "/theodolite.png",
    },
    {
      id: 2,
      title: "Physics",
      icon: "/theodolite.png",
    },
    {
      id: 3,
      title: "Chemistry",
      icon: "/theodolite.png",
    },
    {
      id: 4,
      title: "Biology",
      icon: "/theodolite.png",
    },
    {
      id: 5,
      title: "Computer Science",
      icon: "/theodolite.png",
    },
    {
      id: 6,
      title: "Literature",
      icon: "/theodolite.png",
    },
    {
      id: 7,
      title: "History",
      icon: "/theodolite.png",
    },
    {
      id: 8,
      title: "Geography",
      icon: "/theodolite.png",
    },
    {
      id: 9,
      title: "Art",
      icon: "/theodolite.png",
    },
    {
      id: 10,
      title: "Music",
      icon: "/theodolite.png",
    },
  ];
  const [mode, setMode] = useState("search");

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  const {
    setPublishers,
    setDisciplines,
    setFiltersError,
    setIsFilterLoading,
    publishers,
    disciplines,
  } = useContext(SearchContext);

  const shouldFetchFilterData = publishers.length === 0;

  const { data, error, isLoading } = useGetPageFilterData("searchHome");


  useEffect(() => {
    if (data) {
      setPublishers(data.data.publishers);
      setDisciplines(disciplinesFilter);
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
        <ToggleMode mode={mode} onModeChange={handleModeChange} />
        {mode === "search" && (
          <div className={styles.promotiontext}>
            <h2 className={styles.searchInMoreContainer}>
              <span>{`Search in more then 150,000 `}</span>
              <span className={styles.standard}>Standard</span>
              <span> documents</span>
            </h2>
          </div>
        )}

        {mode === "chatbot" && (
          <div className={styles.promotiontext}>
            <h2 className={styles.searchInMoreContainer}>
              <span>{`Ask your Standard question, `}</span>
              <span className={styles.standard}>AI</span>
              <span> answer</span>
            </h2>
          </div>
        )}

        {mode === "search" && <SearchSection />}
        {mode === "chatbot" && <ChatbotSection />}
        <div className={styles.moreFilterDiv}>
          <hr className={styles.horizontalLine} />
          <p className={styles.morefilter}>discipline filters</p>
          <hr className={styles.horizontalLine} />
        </div>

        <CardFilter />
      </div>
    </div>
  );
};

export default SearchPage;
