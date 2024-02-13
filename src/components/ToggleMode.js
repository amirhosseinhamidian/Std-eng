import styles from "./ToggleMode.module.css";

const ToggleMode = ({ mode, onModeChange }) => {

  return (
    <div className={styles.togglemode}>
      <button className={`${styles.buttonToggle} ${mode === 'search' ? styles.active : ''}`} 
              onClick={() => onModeChange('search')}>
        <b className={`${styles.buttonText} ${mode === 'search' ? styles.buttonTextActive : ''}`}>Search Mode</b>
      </button>
      <button className={`${styles.buttonToggle} ${mode === 'chatbot' ? styles.active : ''}`}
              onClick={() => onModeChange('chatbot')}>
        <b className={`${styles.buttonText} ${mode === 'chatbot' ? styles.buttonTextActive : ''}`}>ChatBot Mode</b>
      </button>
    </div>
  );
};

export default ToggleMode;
