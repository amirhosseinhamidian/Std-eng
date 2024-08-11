import { clearChats, useChat } from "../contexts/ChatContext";
import styles from "./ChatbotSection.module.css";
import { useNavigate } from "react-router-dom";

const ChatbotSection = () => {
  const navigate = useNavigate();
  const { setFirstText, clearChats ,setLoading } = useChat();
  const handleChatSendClick = () => {
    clearChats();
    const inputText = document.getElementById("searchKeyword").value;
    if (inputText) {
      setFirstText(inputText);
      setLoading(true)
      navigate(`/chatbotpage`);
    }
  };
  const keydownHandler = (event) => {
    // enter press to send
    if (event.which === 13) {
      handleChatSendClick();
    }
  };
  return (
    <div className={styles.textinputParent}>
      <input
        className={styles.textinput}
        id="searchKeyword"
        placeholder="Ask your question"
        type="text"
        onKeyDown={keydownHandler}
      />
      <img
        className={styles.send1Icon}
        alt=""
        src="/send.svg"
        onClick={handleChatSendClick}
      />
    </div>
  );
};

export default ChatbotSection;
