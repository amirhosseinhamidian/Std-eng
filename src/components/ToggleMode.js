import styles from "./ToggleMode.module.css";

const ToggleMode = () => {
  return (
    <div className={styles.togglemode}>
      <button className={styles.searchmodebutton} id="searchModeBtn">
        <b className={styles.searchMode}>Search Mode</b>
      </button>
      <button className={styles.chatbotmodebutton} id="chatBotModeBtn">
        <b className={styles.chatbotMode}>ChatBot Mode</b>
      </button>
    </div>
  );
};

export default ToggleMode;
