import styles from "./ChatbotSection.module.css";

const ChatbotSection = () => {
  return (
    <section className={styles.chatbotSection}>
      <div className={styles.chatbotSectionInner}>
        <div className={styles.textinputParent}>
          <input
            className={styles.textinput}
            id="searchKeyword"
            placeholder="Ask your question"
            type="text"
          />
          <img className={styles.send1Icon} alt="" src="/send.svg" />
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
