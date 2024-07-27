import { clearChats, useChat } from "../contexts/ChatContext";
import styles from "./ChatbotSection.module.css";
import { useNavigate } from 'react-router-dom';

const ChatbotSection = () => {
  const navigate = useNavigate();
  const {setFirstText, clearChats} = useChat();
  const handleChatSendClick = () => {
    clearChats();
    const inputText = document.getElementById('searchKeyword').value;
    if (inputText) {
      setFirstText(inputText)
      navigate(`/chatbotpage`);
    }
  }
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
          <img className={styles.send1Icon} alt="" src="/send.svg"  onClick={handleChatSendClick}/>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
