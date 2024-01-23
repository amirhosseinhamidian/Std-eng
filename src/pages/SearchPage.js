import Header from "../components/Header";
import ToggleMode from "../components/ToggleMode";
import SearchSection from "../components/SearchSection";
import styles from "./SearchPage.module.css";

const SearchPage = () => {
  return (
    <div className={styles.searchpage}>
      <Header />
      <div className={styles.searchpageChild} />
      <div className={styles.search}>
        <ToggleMode />
        <div className={styles.promotiontext}>
          <h2 className={styles.searchInMoreContainer}>
            <span>{`Search in more then 150,000 `}</span>
            <span className={styles.standard}>Standard</span>
            <span> documents</span>
          </h2>
        </div>
        <SearchSection />
      </div>
    </div>
  );
};

export default SearchPage;
