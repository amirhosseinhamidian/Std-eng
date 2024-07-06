import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import styles from "./ChatBotPage.module.css";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { useChat } from "../contexts/ChatContext";
import PortalDrawer from "../components/PortalDrawer";
import DrawerChatHistory from "../components/DrawerChatHistory";

const ChatBotPage = () => {
  const {
    prompt,
    setPrompt,
    messages,
    setMessages,
    hasSentFirstMessage,
    setHasSentFirstMessage,
  } = useChat();
  const textbox = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editingText, setEditingText] = useState("");
  const editTextareaRef = useRef(null); 

  const handleEditClick = (index, text) => {
    setEditingMessage(index);
    setEditingText(text);
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditingText("");
  };

  const handleDocumentEdit = () => {
    const updatedMessages = messages.map((message, index) =>
      index === editingMessage ? { ...message, text: editingText } : message
    );
    setMessages(updatedMessages);
    handleCancelEdit();
  };

  const adjustHeightEditTextArea = (textarea) => {
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
  };


  useEffect(() => {
    if (editingMessage !== null && editTextareaRef.current) {
      editTextareaRef.current.focus(); // Set focus on the textarea
      editTextareaRef.current.selectionStart = editTextareaRef.current.value.length;
      editTextareaRef.current.selectionEnd = editTextareaRef.current.value.length;
      adjustHeightEditTextArea(editTextareaRef.current);
    }
  }, [editingMessage]);

  useEffect(() => {
    if (editTextareaRef.current) {
      const handleInput = () => adjustHeight(editTextareaRef.current);
      editTextareaRef.current.addEventListener('input', handleInput);
      return () => editTextareaRef.current.removeEventListener('input', handleInput);
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

  const queryParams = new URLSearchParams(location.search);
  const inputText = queryParams.get("query");

  const handleChatWithPdfClick = (botMessage, userQuestion) => {
    navigate("./standarddetailpage", {
      state: { botMessage, userQuestion },
    });
  };

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

  const generateRandomTitle = () => {
    const words = [
      "The",
      "Quick",
      "Brown",
      "Fox",
      "Jumps",
      "Over",
      "The",
      "Lazy",
      "Dog",
      "Lorem",
      "Ipsum",
      "Dolor",
      "Sit",
      "Amet",
      "Consectetur",
      "Adipiscing",
      "Elit",
    ];

    let title = "";
    for (let i = 0; i < 65; i++) {
      title += words[Math.floor(Math.random() * words.length)] + " ";
    }
    return title.trim(); // Trim to remove extra space at the end
  };

  const generatePublisherAbbreviation = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let abbreviation = "";
    for (let i = 0; i < 4; i++) {
      abbreviation += alphabet.charAt(
        Math.floor(Math.random() * alphabet.length)
      );
    }
    return abbreviation;
  };

  const sendMessage = (text) => {
    const newMessages = [...messages, { text, role: "user" }];
    setMessages(newMessages);
    setPrompt("");

    // Simulate bot reply after 1 second
    setTimeout(() => {
      const title = generateRandomTitle();
      const publisher = generatePublisherAbbreviation();
      const botReply = "This is a mock response from the bot.";
      const newBotMessages = [
        ...newMessages,
        { text: botReply, role: "bot", title: title, publisher: publisher },
      ];
      setMessages(newBotMessages);
    }, 500);
  };

  useEffect(() => {
    if (inputText && !hasSentFirstMessage) {
      setPrompt(inputText);
      sendMessage(inputText);
      setHasSentFirstMessage(true);
    }
  }, [inputText, hasSentFirstMessage, setPrompt]);

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
          <div className={styles.sidebar}>
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
          </div>
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
                      <div className={styles.messageText}>{message.text}</div>
                    )}
                    {message.role !== "user" && (
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
                    )}
                  </div>
                  {message.role === "user" && editingMessage !== index && (
                    <img
                      className={styles.editIcon}
                      src="/pencil.svg"
                      alt="edit"
                      onClick={() => handleEditClick(index, message.text)}
                    />
                  )}
                </div>
              ))}
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
                onChange={(e) => {
                  setPrompt(e.target.value);
                  handleKeyDown(e);
                }}
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
                    sendMessage(prompt);
                  }
                }}
              />
              <img
                className={styles.sendIcon}
                alt="send"
                src="/send.svg"
                onClick={() => sendMessage(prompt)}
              />
            </div>
          </div>
        </div>
        <div className={styles.sidebarButton} onClick={openHistoryDrawer}>
          <img
            className={styles.sidebarImg}
            src="/sidebar.svg"
            alt="sidebar"
            width="24px"
          />
        </div>
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
