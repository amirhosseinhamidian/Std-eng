import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import styles from "./ChatBotPage.module.css";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useChat } from "../contexts/ChatContext";
import PortalDrawer from "../components/PortalDrawer";
import DrawerChatHistory from "../components/DrawerChatHistory";
import { useChatAll } from "../services/apiService";
import loadingAnimation from "../assets/line-loading.json";
import Lottie from "lottie-react";

const ChatBotPage = () => {
  const { prompt, setPrompt, messages, setMessages, firstText, setFirstText, loading, setLoading} = useChat();
  const textbox = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editingText, setEditingText] = useState("");
  const editTextareaRef = useRef(null);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  

  const { mutate: sendChatAll } = useChatAll();

  useEffect(() => {
    const preExistingMessage = firstText !== ''
    if (preExistingMessage) {
      sendMessage(firstText, true);
      setFirstText('')
    }
  }, []); 

  const handleEditClick = (index, text) => {
    setEditingMessage(index);
    setEditingText(text);
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditingText("");
  };

  const handleDocumentEdit = () => {
    const updatedMessages = messages.slice(0, editingMessage + 1).map((message, index) =>
      index === editingMessage ? { ...message, text: editingText } : message
    );
    setMessages(updatedMessages)
    sendMessage(editingText, false);
    handleCancelEdit();
  };

  const adjustHeightEditTextArea = (textarea) => {
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
  };

  useEffect(() => {
    if (editingMessage !== null && editTextareaRef.current) {
      editTextareaRef.current.focus(); // Set focus on the textarea
      editTextareaRef.current.selectionStart =
        editTextareaRef.current.value.length;
      editTextareaRef.current.selectionEnd =
        editTextareaRef.current.value.length;
      adjustHeightEditTextArea(editTextareaRef.current);
    }
  }, [editingMessage]);

  useEffect(() => {
    if (editTextareaRef.current) {
      const handleInput = () => adjustHeight(editTextareaRef.current);
      editTextareaRef.current.addEventListener("input", handleInput);
      return () =>
        editTextareaRef.current.removeEventListener("input", handleInput);
    }
  }, []);

  const handleTextareaChange = (e) => {
    setEditingText(e.target.value);
    adjustHeightEditTextArea(e.target);
  };

  const openHistoryDrawer = useCallback(() => {
    setIsHistoryDrawerOpen(true);
  }, []);

  const closeHistoryDrawer = useCallback(() => {
    setIsHistoryDrawerOpen(false);
  }, []);

  const handleChatWithPdfClick = (botMessage, userQuestion) => {
    navigate("./standarddetailpage", {
      state: { botMessage, userQuestion },
    });
  };

  const handleInputChange = useCallback((event) => {
    setPrompt(event.target.value);
    handleKeyDown(event);
  }, []);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function adjustHeight() {
    textbox.current.style.height = "inherit";
    textbox.current.style.height = `${textbox.current.scrollHeight}px`;
  }

  useLayoutEffect(adjustHeight, []);

  function handleKeyDown(e) {
    adjustHeight();
  }

  const sendMessage = (text, isAddMessage) => {
    if (isAddMessage) {
      const newMessages = [...messages, { text, role: "user" }];
      setMessages(newMessages);
    }
    setPrompt("");
    setLoading(true);
    sendChatAll(text, {
      onSuccess: (response) => {
        setCurrentWord("");
        setCurrentWordIndex(0);
        setLoading(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.join(""), role: "system" },
        ]);
        setWords(response.data);
      },
      onError: (error) => {
        console.error("Error sending message:", error);
        setLoading(false);
      },
    });
  };

  // Effect to handle word animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        setCurrentWord((prevWord) => prevWord + words[currentWordIndex]);
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        scrollToBottom();
      } else {
        clearInterval(interval);
      }
    }, 50); // Milliseconds between each word (adjust as needed)

    return () => {
      clearInterval(interval); // Cleanup on component unmount
    };
  }, [words, currentWordIndex]);

  function formatText(text) {
    // Replace **text** with <b>text</b>
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Replace \n with <br />
    text = text.replace(/\n/g, "<br />");

    // Split text by <br /> to create an array of lines
    const lines = text.split("<br />");

    // Map each line to a <p> element
    const formattedText = lines.map((line, index) => (
      <p
        style={{ textAlign: "left", marginTop: -2 }}
        key={index}
        dangerouslySetInnerHTML={{ __html: line }}
      />
    ));

    return formattedText;
  }

  const chatHistory = {
    Today: ["Chat with Alice", "Chat with Bob"],
    Yesterday: ["Chat with Carol", "Chat with Dave"],
    Last30Days: [
      "Chat with Carol",
      "Chat with Dave Chat with Dave",
      "Chat with Carol",
      "Chat with Dave",
      "Chat with Alice",
      "Chat with Bob",
      "Chat with Alice",
      "Chat with Bob",
      "Chat with Alice",
      "Chat with Bob",
    ],
  };

  return (
    <>
      <div className={styles.continar}>
        <Header />
        <div className={styles.background}>
          {/* <div className={styles.sidebar}>
            <div className={styles.chatHistoryContainer}>
              {Object.keys(chatHistory).map((date) => (
                <div key={date} className={styles.dateSection}>
                  <div className={styles.dateHeader}>{date}</div>
                  <ul className={styles.chatList}>
                    {chatHistory[date].map((chat, index) => (
                      <li key={index} className={styles.chatItem}>
                        <p className={styles.chatLink}>{chat}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div> */}
          <div className={styles.mainContinar}>
            <div className={styles.messages}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${
                    message.role === "user" ? styles.user : styles.systemMessage
                  }`}
                >
                  {message.role === "user" ? (
                    <div className={styles.profileIcon}>
                      <img
                        className={styles.profileImage}
                        src="/frame-32@2x.png"
                      />
                    </div>
                  ) : (
                    <div className={styles.logo}>
                      <img
                        src="/logo.png"
                        alt="System Logo"
                        className={styles.logoImage}
                      />
                    </div>
                  )}
                  <div className={styles.messageContinar}>
                    {editingMessage === index ? (
                      <>
                        <textarea
                          className={styles.editTextarea}
                          value={editingText}
                          onChange={handleTextareaChange}
                          ref={editTextareaRef}
                        />
                        <div className={styles.editButtons}>
                          <button
                            className={styles.documentButton}
                            onClick={handleDocumentEdit}
                          >
                            Send
                          </button>
                          <button
                            className={styles.cancelButton}
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className={styles.messageText}>
                        {message.role !== "user" &&
                        index === messages.length - 1 && 
                        currentWord !== ""
                          ? formatText(currentWord)
                          : formatText(message.text)}
                      </p>
                    )}
                    {/* {message.role !== "user" && (
                      <div className={styles.pdfContinar}>
                        <img
                          className={styles.pdfImg}
                          src="/PDF_icon.png"
                          alt="PDF Icon"
                        />
                        <div className={styles.pdfTextsContainr}>
                          <div className={styles.pdfTitle}>{message.title}</div>
                          <div className={styles.pdfPublisher}>
                            publisher: {message.publisher}
                          </div>
                        </div>
                        <button
                          className={styles.buttonChat}
                          onClick={() =>
                            handleChatWithPdfClick(message, messages[index - 1])
                          }
                        >
                          Chat
                        </button>
                      </div>
                    )} */}
                  </div>
                  {/* {message.role === "user" && editingMessage !== index && (
                    <img
                      className={styles.editIcon}
                      src="/pencil.svg"
                      alt="edit"
                      onClick={() => handleEditClick(index, message.text)}
                    />
                  )} */}
                </div>
              ))}

              {loading && (
                <div
                  className={styles.systemMessage}
                  style={{ marginLeft: 16 }}
                >
                  <div className={styles.logo}>
                    <img
                      src="/logo.png"
                      alt="System Logo"
                      className={styles.logoImage}
                    />
                  </div>
                  <div className={styles.loading}>
                    <Lottie animationData={loadingAnimation} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className={styles.inputContainer}>
              <textarea
                ref={textbox}
                className={styles.input}
                placeholder="Ask your question (max 1,000 characters)"
                type="text"
                value={prompt}
                rows={1}
                style={{ maxHeight: "160px" }}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.shiftKey) {
                    setPrompt(prompt + "\n");
                    e.preventDefault(); // Prevent the default behavior of the Enter key
                  } else if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    prompt.trim() !== ""
                  ) {
                    e.preventDefault(); // Prevent the default behavior of the Enter key
                    sendMessage(prompt, true);
                  }
                }}
              />
              <img
                className={styles.sendIcon}
                alt="send"
                src="/send.svg"
                onClick={() => sendMessage(prompt, true)}
              />
            </div>
          </div>
        </div>
        
        {/* <div className={styles.sidebarButton} onClick={openHistoryDrawer}>
          <img
            className={styles.sidebarImg}
            src="/sidebar.svg"
            alt="sidebar"
            width="24px"
          />
        </div> */}
      </div>
      {isHistoryDrawerOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Right"
          onOutsideClick={closeHistoryDrawer}
        >
          <DrawerChatHistory onClose={closeHistoryDrawer} />
        </PortalDrawer>
      )}
    </>
  );
};

export default ChatBotPage;
